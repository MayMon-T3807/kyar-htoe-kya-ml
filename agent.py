# AI players for Myanmar Checkers:
#   RandomAgent    (Easy)    - picks any legal move
#   HeuristicAgent (Medium)  - picks the move that gives the best board score
#   MinimaxAgent   (Hard)    - looks several moves ahead with Alpha-Beta pruning
import random

from checkers import (
    Checkers, BLACK, WHITE, EMPTY, NO_PROGRESS_LIMIT,
    other_player, owner, is_king, row_col,
)

# ---------- scoring numbers ----------

MAN_VALUE = 100        # one normal piece
KING_VALUE = 180       # a king is worth a lot more
ADVANCE_BONUS = 4      # extra points for each row a man has moved forward
BACK_ROW_BONUS = 10    # a man still on its own back row guards against kings
WIN_SCORE = 10000      # score for winning the game


# ---------- the evaluation function ----------

def points_for(board, player):
    # Add up the value of all pieces that belong to this player
    total = 0
    for pos in range(64):
        piece = board[pos]
        if piece == EMPTY or owner(piece) != player:
            continue

        if is_king(piece):
            total += KING_VALUE
        else:
            total += MAN_VALUE

            # How many rows has this man moved from its own side?
            row = row_col(pos)[0]
            if player == BLACK:
                rows_moved = row
            else:
                rows_moved = 7 - row
            total += rows_moved * ADVANCE_BONUS

            # Still on the back row?
            if rows_moved == 0:
                total += BACK_ROW_BONUS
    return total


def evaluate(game, player):
    # Positive = good for `player`, negative = good for the opponent
    my_points = points_for(game.board, player)
    their_points = points_for(game.board, other_player(player))
    return my_points - their_points


# ---------- danger check (used by the Medium agent) ----------

def is_jump(move):
    # A jump moves 2 rows in one step, a normal move moves 1 row
    first_row = row_col(move[0])[0]
    second_row = row_col(move[1])[0]
    return abs(first_row - second_row) == 2


def pieces_we_could_lose(game):
    # Call this right after our move. It is now the opponent's turn.
    # If the opponent can jump, count the most pieces they can take.
    most_captured = 0
    for move in game.get_legal_moves():
        if is_jump(move):
            captured = len(move) - 1
            if captured > most_captured:
                most_captured = captured
    return most_captured


# ---------- Easy ----------

class RandomAgent:
    name = "Random"

    def __init__(self, player=BLACK):
        self.player = player

    def get_move(self, game):
        # Pick any legal move
        return random.choice(game.get_legal_moves())


# ---------- Medium ----------

class HeuristicAgent:
    name = "Heuristic"

    def __init__(self, player=BLACK):
        self.player = player

    def get_move(self, game):
        best_score = float('-inf')
        best_moves = []

        for move in game.get_legal_moves():
            # step 1: try the move
            game.make_move(move, check=False)

            # step 2: score the board we get
            score = evaluate(game, self.player)

            # step 2b: lose points if the opponent can capture right away
            score -= pieces_we_could_lose(game) * MAN_VALUE

            # step 3: take the move back
            game.undo_move()

            # step 4: keep the best move (remember ties)
            if score > best_score:
                best_score = score
                best_moves = [move]
            elif score == best_score:
                best_moves.append(move)

        return random.choice(best_moves)


# ---------- Hard ----------

class MinimaxAgent:
    name = "Minimax"

    def __init__(self, player=BLACK, depth=5, use_alpha_beta=True):
        self.player = player
        self.opponent = other_player(player)
        self.depth = depth                  # how many moves ahead to look
        self.use_alpha_beta = use_alpha_beta
        self.nodes_visited = 0
        self.move_scores = {}

    def get_move(self, game):
        self.nodes_visited = 0
        self.move_scores = {}

        best_score = float('-inf')
        best_moves = []

        for move in game.get_legal_moves():
            # step 1: try the move
            game.make_move(move, check=False)

            # step 2: score it, assuming the opponent plays next
            score = self.min_value(game, 1, float('-inf'), float('inf'))

            # step 3: take the move back
            game.undo_move()

            # step 4: remember the score and keep the best move(s)
            self.move_scores[move] = score
            if score > best_score:
                best_score = score
                best_moves = [move]
            elif score == best_score:
                best_moves.append(move)

        return random.choice(best_moves)

    def final_score(self, game, moves, ply):
        # Returns a score if the search should stop here, otherwise None.
        # `ply` = how many moves we are away from the real board.

        # The player to move has no moves: they lose
        if len(moves) == 0:
            if game.current_player == self.player:
                return ply - WIN_SCORE      # we lose (later loss is less bad)
            return WIN_SCORE - ply          # we win (sooner win is better)

        # Draw by the no-progress rule
        if game.no_progress >= NO_PROGRESS_LIMIT:
            return 0

        # Looked far enough: guess with the evaluation function
        if ply >= self.depth:
            return evaluate(game, self.player)

        return None

    def max_value(self, game, ply, alpha, beta):
        # Our turn: pick the highest score
        self.nodes_visited += 1

        moves = game.get_legal_moves()
        score = self.final_score(game, moves, ply)
        if score is not None:
            return score

        best = float('-inf')
        for move in moves:
            game.make_move(move, check=False)
            best = max(best, self.min_value(game, ply + 1, alpha, beta))
            game.undo_move()

            alpha = max(alpha, best)
            if self.use_alpha_beta and alpha >= beta:
                break       # cutoff: the opponent will never allow this branch
        return best

    def min_value(self, game, ply, alpha, beta):
        # Opponent's turn: assume they pick the lowest score for us
        self.nodes_visited += 1

        moves = game.get_legal_moves()
        score = self.final_score(game, moves, ply)
        if score is not None:
            return score

        best = float('inf')
        for move in moves:
            game.make_move(move, check=False)
            best = min(best, self.max_value(game, ply + 1, alpha, beta))
            game.undo_move()

            beta = min(beta, best)
            if self.use_alpha_beta and alpha >= beta:
                break       # cutoff: we already have a better option elsewhere
        return best


# ---------- helpers ----------

def make_agent(level, player):
    # Turn a level name from the web page into an agent
    level = level.lower()
    if level in ("easy", "random"):
        return RandomAgent(player=player)
    if level in ("medium", "heuristic"):
        return HeuristicAgent(player=player)
    if level in ("hard", "minimax"):
        return MinimaxAgent(player=player)
    raise ValueError("Unknown agent level: " + level)


def simulate_match(agent1, agent2, num_games=20, max_turns=300):
    # Play num_games full games. agent1 and agent2 must have different colours.
    results = {"agent1_wins": 0, "agent2_wins": 0, "draws": 0, "games": num_games}
    agent_for_color = {agent1.player: agent1, agent2.player: agent2}

    for _ in range(num_games):
        game = Checkers()
        turns = 0

        # Whoever's colour is up next chooses the move
        while not game.is_game_over() and turns < max_turns:
            agent = agent_for_color[game.current_player]
            game.make_move(agent.get_move(game), check=False)
            turns += 1

        winner = game.check_winner()
        if winner is None:
            results["draws"] += 1
        elif winner == agent1.player:
            results["agent1_wins"] += 1
        else:
            results["agent2_wins"] += 1

    return results