# Myanmar Checkers game engine: board, legal moves, jumps, winner and draw checks.
#
# The board is a flat list of 64 cells. Cell number = row * 8 + column.
# Row 0 is the top (black's side), row 7 is the bottom (white's side).
#
#   row 0:   0  1  2  3  4  5  6  7
#   row 1:   8  9 10 11 12 13 14 15
#   ...
#   row 7:  56 57 58 59 60 61 62 63
#
# Only the dark squares are used: a square is dark when (row + column) is odd.

BLACK = 'b'
WHITE = 'w'
BLACK_KING = 'B'
WHITE_KING = 'W'
EMPTY = ' '

# Black moves down the board (row goes up), white moves up (row goes down)
BLACK_FORWARD = [(1, -1), (1, 1)]
WHITE_FORWARD = [(-1, -1), (-1, 1)]
ALL_DIRECTIONS = [(1, -1), (1, 1), (-1, -1), (-1, 1)]

# A man becomes a king when it reaches the opponent's last row
CROWN_ROW = {BLACK: 7, WHITE: 0}

# Draw after this many turns in a row with only king moves and no capture
NO_PROGRESS_LIMIT = 40


def position(row, col):
    return row * 8 + col


def row_col(pos):
    return pos // 8, pos % 8


def on_board(row, col):
    return 0 <= row < 8 and 0 <= col < 8


def other_player(player):
    if player == BLACK:
        return WHITE
    return BLACK


def owner(piece):
    # 'B' and 'b' both belong to black, 'W' and 'w' both belong to white
    return piece.lower()


def is_king(piece):
    return piece in (BLACK_KING, WHITE_KING)


def directions_for(piece):
    if is_king(piece):
        return ALL_DIRECTIONS
    if piece == BLACK:
        return BLACK_FORWARD
    return WHITE_FORWARD


def start_board():
    board = [EMPTY] * 64
    for row in range(8):
        for col in range(8):
            if (row + col) % 2 == 1:
                if row < 3:
                    board[position(row, col)] = BLACK
                elif row > 4:
                    board[position(row, col)] = WHITE
    return board


class Checkers:
    def __init__(self, board=None, current_player=BLACK):
        # Step 1: start from the normal opening position unless a board is given
        if board is None:
            self.board = start_board()
        else:
            self.board = list(board)

        # Step 2: black always moves first
        self.current_player = current_player

        # Step 3: counts turns with only king moves (used for the draw rule)
        self.no_progress = 0

        # Step 4: remember every move so undo_move can take it back
        self.history = []

    # ---------- finding moves ----------

    def get_legal_moves(self, player=None):
        # A move is a tuple of squares: (start, landing1, landing2, ...)
        # A normal move has 2 squares. A jump has 2 or more landings.
        if player is None:
            player = self.current_player

        # Rule: if any jump exists, you must jump
        jumps = []
        for pos in range(64):
            piece = self.board[pos]
            if piece != EMPTY and owner(piece) == player:
                jumps.extend(self.find_jump_chains(pos, piece))
        if jumps:
            return jumps

        # Otherwise: normal one-step moves
        steps = []
        for pos in range(64):
            piece = self.board[pos]
            if piece != EMPTY and owner(piece) == player:
                steps.extend(self.find_step_moves(pos, piece))
        return steps

    def find_step_moves(self, pos, piece):
        moves = []
        row, col = row_col(pos)
        for d_row, d_col in directions_for(piece):
            new_row, new_col = row + d_row, col + d_col
            if on_board(new_row, new_col):
                target = position(new_row, new_col)
                if self.board[target] == EMPTY:
                    moves.append((pos, target))
        return moves

    def find_jump_chains(self, start, piece):
        # Lift the piece off the board while we search, so it can pass
        # over the square it started from
        chains = []
        self.board[start] = EMPTY
        self.extend_chain([start], piece, [], chains)
        self.board[start] = piece
        return chains

    def extend_chain(self, path, piece, captured, chains):
        row, col = row_col(path[-1])
        found_jump = False

        for d_row, d_col in directions_for(piece):
            mid_row, mid_col = row + d_row, col + d_col
            land_row, land_col = row + 2 * d_row, col + 2 * d_col
            if not on_board(land_row, land_col):
                continue

            mid = position(mid_row, mid_col)
            land = position(land_row, land_col)
            mid_piece = self.board[mid]

            # Need: an enemy piece (not captured yet) with an empty square behind it
            is_enemy = mid_piece != EMPTY and owner(mid_piece) != owner(piece)
            if is_enemy and mid not in captured and self.board[land] == EMPTY:
                found_jump = True
                captured.append(mid)
                path.append(land)

                # A man that reaches the last row is crowned and the turn ends
                crowned = (not is_king(piece)) and land_row == CROWN_ROW[owner(piece)]
                if crowned:
                    chains.append(tuple(path))
                else:
                    self.extend_chain(path, piece, captured, chains)

                path.pop()
                captured.pop()

        # No more jumps from here: the chain is finished (if it has at least one jump)
        if not found_jump and len(path) > 1:
            chains.append(tuple(path))

    # ---------- playing and undoing ----------

    def make_move(self, move, check=True):
        move = tuple(move)

        # Step 1: refuse illegal moves (the AI skips this check to go faster)
        if check and move not in self.get_legal_moves():
            return False

        start = move[0]
        end = move[-1]
        piece = self.board[start]

        # Step 2: remove every enemy piece we jumped over
        captured = []
        for i in range(len(move) - 1):
            row_a, col_a = row_col(move[i])
            row_b, col_b = row_col(move[i + 1])
            if abs(row_a - row_b) == 2:
                mid = position((row_a + row_b) // 2, (col_a + col_b) // 2)
                captured.append((mid, self.board[mid]))
                self.board[mid] = EMPTY

        # Step 3: move the piece, and crown it if it reached the last row
        new_piece = piece
        if not is_king(piece) and row_col(end)[0] == CROWN_ROW[owner(piece)]:
            new_piece = piece.upper()
        self.board[start] = EMPTY
        self.board[end] = new_piece

        # Step 4: update the draw counter (reset on captures and man moves)
        old_no_progress = self.no_progress
        if captured or not is_king(piece):
            self.no_progress = 0
        else:
            self.no_progress += 1

        # Step 5: save what we need to undo, then pass the turn
        self.history.append((move, piece, captured, self.current_player, old_no_progress))
        self.current_player = other_player(self.current_player)
        return True

    def undo_move(self):
        # Take back the last move: everything is restored from history
        if not self.history:
            return False

        move, piece, captured, old_player, old_no_progress = self.history.pop()

        self.board[move[-1]] = EMPTY
        self.board[move[0]] = piece
        for pos, captured_piece in captured:
            self.board[pos] = captured_piece

        self.current_player = old_player
        self.no_progress = old_no_progress
        return True

    # ---------- game result ----------

    def check_winner(self):
        # The player to move loses if they have no legal move
        # (this also covers having no pieces left)
        if len(self.get_legal_moves()) == 0:
            return other_player(self.current_player)
        return None

    def is_draw(self):
        return self.no_progress >= NO_PROGRESS_LIMIT and self.check_winner() is None

    def is_game_over(self):
        return self.check_winner() is not None or self.is_draw()

    # ---------- helpers ----------

    def count_pieces(self, player):
        men = 0
        kings = 0
        for piece in self.board:
            if piece != EMPTY and owner(piece) == player:
                if is_king(piece):
                    kings += 1
                else:
                    men += 1
        return men, kings

    def copy(self):
        game = Checkers(self.board, self.current_player)
        game.no_progress = self.no_progress
        return game

    def __str__(self):
        lines = []
        for row in range(8):
            cells = []
            for col in range(8):
                piece = self.board[position(row, col)]
                if piece == EMPTY and (row + col) % 2 == 1:
                    piece = '.'
                cells.append(piece)
            lines.append(str(row) + '  ' + ' '.join(cells))
        lines.append('   ' + ' '.join(str(c) for c in range(8)))
        return '\n'.join(lines)