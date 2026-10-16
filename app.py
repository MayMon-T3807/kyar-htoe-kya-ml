# Flask backend for Myanmar Checkers.
# The server keeps no game in memory: the page sends the whole game state
# (board, whose turn, no_progress) with every request.
import os

from flask import Flask, jsonify, render_template, request

from checkers import Checkers, BLACK, WHITE, EMPTY, other_player
from agent import MinimaxAgent, make_agent

app = Flask(__name__)

VALID_CELLS = [BLACK, WHITE, 'B', 'W', EMPTY]


# ---------- helpers ----------

def game_from_request(data):
    # Step 1: read the state sent by the page
    state = data.get("state")
    if not state:
        raise ValueError("Missing game state")

    board = state.get("board")
    current_player = state.get("current_player")
    no_progress = state.get("no_progress", 0)

    # Step 2: check it looks right
    if not isinstance(board, list) or len(board) != 64:
        raise ValueError("Board must be a list of 64 cells")
    for cell in board:
        if cell not in VALID_CELLS:
            raise ValueError("Bad cell on board: " + str(cell))
    if current_player not in (BLACK, WHITE):
        raise ValueError("current_player must be 'b' or 'w'")

    # Step 3: build the game
    game = Checkers(board, current_player)
    game.no_progress = int(no_progress)
    return game


def describe_game(game):
    # Everything the page needs to draw the board and show the status
    winner = game.check_winner()
    is_draw = game.is_draw()
    black_men, black_kings = game.count_pieces(BLACK)
    white_men, white_kings = game.count_pieces(WHITE)

    return {
        "board": game.board,
        "current_player": game.current_player,
        "no_progress": game.no_progress,
        "legal_moves": [list(move) for move in game.get_legal_moves()],
        "winner": winner,
        "is_draw": is_draw,
        "game_over": winner is not None or is_draw,
        "counts": {
            "b": {"men": black_men, "kings": black_kings},
            "w": {"men": white_men, "kings": white_kings},
        },
    }


# ---------- routes ----------

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/new", methods=["POST"])
def new_game():
    return jsonify(describe_game(Checkers()))


@app.route("/api/move", methods=["POST"])
def play_move():
    # The human plays a move
    data = request.get_json(force=True)
    game = game_from_request(data)

    move = data.get("move")
    if not move:
        raise ValueError("Missing move")

    if game.is_game_over():
        raise ValueError("The game is already over")
    if not game.make_move(move):
        raise ValueError("That is not a legal move")

    return jsonify(describe_game(game))


@app.route("/api/ai_move", methods=["POST"])
def ai_move():
    # The computer plays a move
    data = request.get_json(force=True)
    game = game_from_request(data)
    level = data.get("level", "easy")

    if game.is_game_over():
        raise ValueError("The game is already over")

    agent = make_agent(level, game.current_player)
    move = agent.get_move(game)

    notes = {"level": level, "agent": agent.name, "move": list(move)}
    if isinstance(agent, MinimaxAgent):
        notes["nodes_visited"] = agent.nodes_visited
        notes["depth"] = agent.depth
        notes["scores"] = [
            {"move": list(m), "score": s} for m, s in agent.move_scores.items()
        ]
        notes["scores"].sort(key=lambda item: item["score"], reverse=True)

    game.make_move(move, check=False)

    result = describe_game(game)
    result["notes"] = notes
    return jsonify(result)


@app.route("/api/pruning", methods=["POST"])
def compare_pruning():
    # Search the same board with and without Alpha-Beta and compare
    data = request.get_json(force=True)
    game = game_from_request(data)
    if game.is_game_over():
        raise ValueError("The game is already over")

    plain = MinimaxAgent(game.current_player, depth=5, use_alpha_beta=False)
    plain.get_move(game)

    pruned = MinimaxAgent(game.current_player, depth=5, use_alpha_beta=True)
    pruned.get_move(game)

    saved = 100 * (1 - pruned.nodes_visited / plain.nodes_visited)
    return jsonify({
        "without_pruning": plain.nodes_visited,
        "with_pruning": pruned.nodes_visited,
        "percent_saved": round(saved, 1),
        "same_scores": plain.move_scores == pruned.move_scores,
    })


@app.errorhandler(ValueError)
def handle_value_error(error):
    return jsonify({"error": str(error)}), 400


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)