// ကျားထိုးကြမယ် | Kyar Htoe Kya Ml
// One page, two screens: (1) choose opponent, (2) play.
// The server (app.py) knows the rules; this file draws the board and the pieces.

// =====================================================================
// 1. TEXT IN TWO LANGUAGES
// =====================================================================

const TEXT = {
  mm: {
    tagline: "ရိုးရာကျားထိုးတာကို ကွန်ပျူတာနဲ့ စမ်းသပ်ကြည့်ရအောင်",
    chooseOpponent: "ပြိုင်ဘက်ကို ရွေးပါ",
    levelEasy: "လွယ်ကူ",
    levelMedium: "အလယ်အလတ်",
    levelHard: "ခက်ခဲ",
    descEasy: "အကွက်ကို ကျပန်းရွေးပြီး ထိုးပါတယ်။ စတင်လေ့လာသူတွေအတွက် သင့်တော်ပါတယ်။",
    descMedium: "ကိုယ့်ကျား မပျက်အောင် စစ်ဆေးပြီး အမှတ်အကောင်းဆုံး အကွက်ကို ရွေးပါတယ်။",
    descHard: "နောက်ကွက် ငါးကွက်အထိ ကြိုတွေးပြီး ထိုးပါတယ်။ အနိုင်ယူဖို့ ခက်ပါတယ်။",
    yourPieces: "သင့်ကျားအရောင်",
    sideRed: "ကျားအနီ",
    sideRedNote: "သင် အရင်ထိုးမယ်",
    sideIvory: "ကျားအဖြူ",
    sideIvoryNote: "ကွန်ပျူတာ အရင်ထိုးမယ်",
    play: "စတင်မယ်",
    howToPlay: "ကစားနည်း",
    rule1: "ကျားတစ်ကောင်ကို ထောင့်ဖြတ်အတိုင်း ရှေ့ဘက်တစ်ကွက်စီသာ ရွှေ့နိုင်ပါတယ်။",
    rule2: "ရန်သူ့ကျားနောက်မှာ နေရာလွတ်ရှိရင် ကျော်ခုန်ပြီး စားနိုင်ပါတယ်။ စားလို့ရရင် မဖြစ်မနေ စားရပါမယ်။ ဆက်စားလို့ရရင်လည်း ဆက်စားရပါမယ်။",
    rule3: "ရန်သူ့ဘက်ခြမ်း နောက်ဆုံးတန်းကို ရောက်ရင် ကင်းဖြစ်ပြီး ရှေ့နောက် နှစ်ဘက်လုံး ရွှေ့နိုင်ပါတယ်။",
    rule4: "ရန်သူ့ကျားအားလုံးကို စားလိုက်ရင် ဒါမှမဟုတ် ရန်သူ ရွှေ့စရာမရှိအောင် ပိတ်ထားနိုင်ရင် နိုင်ပါတယ်။",
    piecesLeft: "ကျန်ရှိသောကျား",
    notesTitle: "ကွန်ပျူတာရဲ့ မှတ်စု",
    newGame: "ပွဲသစ်စမယ်",
    chooseAgain: "ပြိုင်ဘက်ပြန်ရွေးမယ်",
    playAgain: "ထပ်ထိုးမယ်",
    home: "ပင်မစာမျက်နှာ",
    sound: "အသံ",
    you: "သင်",
    computer: "ကွန်ပျူတာ",
    kings: "ကင်း",
    yourTurn: "သင့်အလှည့်",
    computerTurn: "ကွန်ပျူတာ အလှည့်",
    thinking: "ကွန်ပျူတာ စဉ်းစားနေပါတယ်…",
    pickPiece: "ရွှေ့မယ့်ကျားကို ဆွဲယူပါ၊ ဒါမှမဟုတ် နှိပ်ပါ။",
    mustCapture: "စားလို့ရတဲ့ကျား ရှိနေလို့ မဖြစ်မနေ စားရပါမယ်။",
    chooseNext: "ဆက်ခုန်ရမယ့် အကွက်ကို ရွေးပါ။",
    notAllowed: "ဒီအကွက်ကို မရွှေ့နိုင်ပါဘူး။",
    errorMsg: "ချိတ်ဆက်မှု ပြဿနာရှိနေပါတယ်။ ပြန်စမ်းကြည့်ပါ။",
    computerMoved: "ကွန်ပျူတာက ",
    moved: " ကို ရွှေ့လိုက်ပါတယ်။",
    youWon: "ဂုဏ်ယူပါတယ်!",
    youWonText: "သင် အနိုင်ရပါပြီ။",
    youLost: "ကွန်ပျူတာ နိုင်သွားပါတယ်",
    youLostText: "ထပ်ကြိုးစားကြည့်ပါဦး။",
    drawTitle: "သရေကျပါတယ်",
    drawText: "နှစ်ဖက်လုံး ကောင်းကောင်း ထိုးခဲ့ပါတယ်။",
    waiting: "ကွန်ပျူတာ ထိုးပြီးရင် ဒီမှာ မှတ်စု ပေါ်လာပါမယ်။",
    randomNote: "ဒီအကွက်ကို ကျပန်း ရွေးလိုက်တာပါ။",
    heuristicNote: "အမှတ်အကောင်းဆုံး ရတဲ့အကွက်ကို ရွေးလိုက်တာပါ။",
    depthLabel: "ကြိုတွေးတဲ့ အကွက်အရေအတွက်",
    nodesLabel: "စစ်ဆေးခဲ့တဲ့ အနေအထား",
    scoresTitle: "အကွက်တစ်ခုစီရဲ့ အမှတ်",
    winWord: "နိုင်",
    loseWord: "ရှုံး"
  },
  en: {
    tagline: "Traditional checkers, played against the computer.",
    chooseOpponent: "Choose your opponent",
    levelEasy: "Easy",
    levelMedium: "Medium",
    levelHard: "Hard",
    descEasy: "Plays any legal move at random. Great for beginners.",
    descMedium: "Picks the move with the best board score and avoids obvious losses.",
    descHard: "Looks five moves ahead with Alpha-Beta pruning. Tough to beat.",
    yourPieces: "Your pieces",
    sideRed: "Red pieces",
    sideRedNote: "You move first",
    sideIvory: "Ivory pieces",
    sideIvoryNote: "Computer moves first",
    play: "Play",
    howToPlay: "How to play",
    rule1: "A piece moves one square diagonally forward.",
    rule2: "If an enemy piece has an empty square behind it, jump over it to capture it. Captures are compulsory, and you must keep jumping if you can.",
    rule3: "A piece that reaches the far row becomes a King and can move both forward and backward.",
    rule4: "You win by capturing every enemy piece, or by leaving the enemy with no move.",
    piecesLeft: "Pieces left",
    notesTitle: "Computer's notes",
    newGame: "New game",
    chooseAgain: "Change opponent",
    playAgain: "Play again",
    home: "Home",
    sound: "Sound",
    you: "you",
    computer: "computer",
    kings: "kings",
    yourTurn: "Your turn",
    computerTurn: "Computer's turn",
    thinking: "The computer is thinking…",
    pickPiece: "Drag a piece, or click it.",
    mustCapture: "You must capture. A jump is available.",
    chooseNext: "Choose the next square to jump to.",
    notAllowed: "That move isn't allowed.",
    errorMsg: "Connection problem. Please try again.",
    computerMoved: "The computer moved ",
    moved: ".",
    youWon: "Congratulations!",
    youWonText: "You won the game.",
    youLost: "The computer won",
    youLostText: "Give it another try.",
    drawTitle: "It's a draw",
    drawText: "Both sides played well.",
    waiting: "After the computer moves, its notes appear here.",
    randomNote: "This move was picked at random.",
    heuristicNote: "This move had the best board score.",
    depthLabel: "Moves looked ahead",
    nodesLabel: "Positions searched",
    scoresTitle: "Score of each move",
    winWord: "win",
    loseWord: "loss"
  }
};

const AGENT_NAMES = { easy: "Random Agent", medium: "Heuristic Agent", hard: "Minimax Agent" };
const LEVEL_KEYS = { easy: "levelEasy", medium: "levelMedium", hard: "levelHard" };

let lang = "mm";

function t(key) {
  return TEXT[lang][key] || key;
}

function applyLanguage() {
  document.body.classList.toggle("lang-en", lang === "en");
  document.documentElement.lang = lang === "en" ? "en" : "my";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
    el.title = t(el.dataset.i18nTitle);
  });

  document.getElementById("langMm").classList.toggle("active", lang === "mm");
  document.getElementById("langEn").classList.toggle("active", lang === "en");

  // texts that depend on the game
  if (game) {
    updateSideLabels();
    updateStatus();
    showNotes(lastNotes);
    if (document.getElementById("overlay").classList.contains("show")) fillOverlay();
  }
}

function setLanguage(newLang) {
  lang = newLang;
  try { localStorage.setItem("kyar-lang", lang); } catch (e) { /* storage may be blocked */ }
  applyLanguage();
}

// =====================================================================
// 2. SMALL HELPERS
// =====================================================================

const $ = function (id) { return document.getElementById(id); };
const sleep = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); };

function rowOf(pos) { return Math.floor(pos / 8); }
function colOf(pos) { return pos % 8; }

function isJump(move) {
  return Math.abs(rowOf(move[0]) - rowOf(move[1])) === 2;
}

// a move like [17, 24] becomes "b3 → a4" (read from your side: a-h left to right, 1-8 bottom to top)
function squareName(pos) {
  const visualCol = flip ? 7 - colOf(pos) : colOf(pos);
  const visualRow = flip ? 7 - rowOf(pos) : rowOf(pos);
  return "abcdefgh"[visualCol] + (8 - visualRow);
}
function moveLabel(move) {
  return move.map(squareName).join(" → ");
}

async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {})
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

// the server only needs these three things to know the game
function stateForServer() {
  return { board: game.board, current_player: game.current_player, no_progress: game.no_progress };
}

// =====================================================================
// 3. SOUND (soft wooden clicks made with the browser's audio)
// =====================================================================

let audioCtx = null;
let muted = false;

function playSound(kind) {
  if (muted) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;

    // a short low "thump"
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(kind === "lift" ? 260 : 170, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);
    gain.gain.setValueAtTime(kind === "lift" ? 0.12 : 0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // a tiny "tick" of noise for the wood
    const length = Math.floor(audioCtx.sampleRate * 0.05);
    const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const noise = audioCtx.createBufferSource();
    const filter = audioCtx.createBiquadFilter();
    const noiseGain = audioCtx.createGain();
    filter.type = "bandpass";
    filter.frequency.value = 1400;
    noiseGain.gain.value = kind === "lift" ? 0.05 : 0.14;
    noise.buffer = buffer;
    noise.connect(filter).connect(noiseGain).connect(audioCtx.destination);
    noise.start(now);
  } catch (e) { /* no sound is fine */ }
}

// =====================================================================
// 4. GAME STATE
// =====================================================================

let chosenLevel = "easy";   // what the player picked on screen 1
let chosenSide = "b";       // 'b' = red (moves first), 'w' = ivory

let level = "easy";         // what is being used in the current game
let human = "b";
let computer = "w";
let flip = false;           // the human's pieces are always drawn at the bottom

let game = null;            // last state from the server
let busy = false;           // true while a piece is moving or the computer is thinking
let path = [];              // squares the player has chosen so far in this move
let holding = null;         // { el } piece currently lifted (during multi-jumps)
let lastNotes = null;

let cellEls = [];           // board squares, by position 0..63
let pieceEls = {};          // piece elements, by position

const layer = $("pieceLayer");
const grid = $("boardGrid");

// =====================================================================
// 5. SCREENS
// =====================================================================

function showView(name) {
  document.body.classList.toggle("view-home", name === "home");
  document.body.classList.toggle("view-game", name === "game");
  window.scrollTo(0, 0);
}

function goHome() {
  busy = false;
  $("overlay").classList.remove("show");
  showView("home");
}

// =====================================================================
// 6. BUILDING THE BOARD
// =====================================================================

function buildBoard() {
  grid.innerHTML = "";
  cellEls = [];

  // remove old coordinate labels
  document.querySelectorAll(".coord").forEach(function (el) { el.remove(); });

  // 64 squares. Visual position (row, col) -> real position on the board.
  for (let vr = 0; vr < 8; vr++) {
    for (let vc = 0; vc < 8; vc++) {
      const visualIndex = vr * 8 + vc;
      const pos = flip ? 63 - visualIndex : visualIndex;

      const cell = document.createElement("div");
      cell.className = "cell " + ((vr + vc) % 2 === 1 ? "dark" : "light");
      cell.dataset.pos = pos;

      const centre = document.createElement("i");
      centre.className = "ctr";
      cell.appendChild(centre);

      grid.appendChild(cell);
      cellEls[pos] = cell;
    }
  }

  // letters under the board and numbers on its side, like a real board
  const top = document.querySelector(".board-top");
  for (let i = 0; i < 8; i++) {
    const letter = document.createElement("span");
    letter.className = "coord";
    letter.textContent = "abcdefgh"[i];
    letter.style.cssText = "position:absolute;bottom:0.6%;left:" + (4.6 + (i + 0.5) * 90.8 / 8) + "%;transform:translateX(-50%);font:700 calc(var(--board)*0.026)/1 var(--font-en);color:#ecc96a;";
    top.appendChild(letter);

    const number = document.createElement("span");
    number.className = "coord";
    number.textContent = 8 - i;
    number.style.cssText = "position:absolute;left:0.9%;top:" + (4.6 + (i + 0.5) * 90.8 / 8) + "%;transform:translateY(-50%);font:700 calc(var(--board)*0.026)/1 var(--font-en);color:#ecc96a;";
    top.appendChild(number);
  }
}

// centre of a square, measured inside the piece layer
function cellCentre(pos) {
  const marker = cellEls[pos].firstChild.getBoundingClientRect();
  const origin = layer.getBoundingClientRect();
  return {
    x: marker.left + marker.width / 2 - origin.left,
    y: marker.top + marker.height / 2 - origin.top
  };
}

// how big a piece should look on this square (squares near the player look bigger)
function pieceSize(pos) {
  const box = cellEls[pos].getBoundingClientRect();
  return { w: box.width * 0.74, h: box.height * 0.74 };
}

// =====================================================================
// 7. DRAWING PIECES
// =====================================================================

const CROWN_SVG =
  '<svg class="crown" viewBox="0 0 24 24"><path d="M3 18h18l1.5-10-5 4L12 4 7.5 12l-5-4z" fill="#ecc96a" stroke="#8a5f12" stroke-width="1.2" stroke-linejoin="round"/><rect x="3" y="18" width="18" height="2.6" rx="1" fill="#c9983a" stroke="#8a5f12" stroke-width="1"/></svg>';

function createPiece(pos, symbol) {
  const side = symbol.toLowerCase();             // 'b' or 'w'
  const isKing = symbol === symbol.toUpperCase();

  const el = document.createElement("div");
  el.className = "piece " + (side === "b" ? "red" : "ivory") + (isKing ? " king" : "");
  el.dataset.pos = pos;

  const size = pieceSize(pos);
  const centre = cellCentre(pos);
  el.style.width = size.w + "px";
  el.style.height = size.h + "px";
  el.style.marginLeft = -size.w / 2 + "px";
  el.style.marginTop = -size.h / 2 + "px";
  el.style.left = centre.x + "px";
  el.style.top = centre.y + "px";
  el.style.zIndex = Math.round(centre.y);
  el.style.setProperty("--lift", size.h * 0.32 + "px");

  const shadow = document.createElement("div");
  shadow.className = "shadow";
  const body = document.createElement("div");
  body.className = "body";
  body.innerHTML = isKing ? CROWN_SVG : "";

  // the thickness of the piece: a stack of 1px shadows going downwards
  const thickness = Math.max(3, Math.round(size.w * (isKing ? 0.2 : 0.12)));
  const sideColour = side === "b" ? "#4d0b0f" : "#a8946a";
  const goldColour = "#c9983a";
  const layers = [];
  for (let i = 1; i <= thickness; i++) {
    const colour = isKing && i <= 2 ? goldColour : sideColour;
    layers.push("0 " + i + "px 0 " + colour);
  }
  body.style.boxShadow = layers.join(",");

  el.appendChild(shadow);
  el.appendChild(body);
  layer.appendChild(el);
  return el;
}

function renderPieces() {
  layer.querySelectorAll(".piece").forEach(function (el) { el.remove(); });
  pieceEls = {};

  for (let pos = 0; pos < 64; pos++) {
    const symbol = game.board[pos];
    if (symbol === " ") continue;
    const el = createPiece(pos, symbol);
    pieceEls[pos] = el;
  }
  markMovablePieces();
}

// only the human's pieces that have a legal move can be picked up
function markMovablePieces() {
  const mustJump = game.legal_moves.length > 0 && isJump(game.legal_moves[0]);
  for (const pos in pieceEls) {
    const el = pieceEls[pos];
    el.classList.remove("movable", "hint");
    el.onpointerdown = null;
  }
  if (busy || game.game_over || game.current_player !== human) return;

  const starts = new Set(game.legal_moves.map(function (m) { return m[0]; }));
  starts.forEach(function (pos) {
    const el = pieceEls[pos];
    if (!el) return;
    el.classList.add("movable");
    if (mustJump) el.classList.add("hint");
    el.onpointerdown = onPiecePointerDown;
  });
}

function clearHighlights() {
  cellEls.forEach(function (cell) { cell.classList.remove("target", "selected"); });
}

function showLastMove(move) {
  cellEls.forEach(function (cell) { cell.classList.remove("last"); });
  if (!move) return;
  move.forEach(function (pos) { cellEls[pos].classList.add("last"); });
}

// =====================================================================
// 8. MOVING A PIECE (used for the human's click moves and the computer)
// =====================================================================

async function liftPiece(el) {
  el.classList.add("lifted");
  el.style.zIndex = 99990;
  playSound("lift");
  await sleep(220);
}

async function dropPiece(el) {
  el.classList.remove("lifted");
  playSound("clack");
  await sleep(230);
}

// slide the held piece to a square; fade the piece it jumps over
async function glideTo(el, fromPos, toPos) {
  const centre = cellCentre(toPos);
  el.classList.remove("no-anim");
  el.style.left = centre.x + "px";
  el.style.top = centre.y + "px";

  if (Math.abs(rowOf(fromPos) - rowOf(toPos)) === 2) {
    const middle = (fromPos + toPos) / 2;
    setTimeout(function () {
      if (pieceEls[middle]) pieceEls[middle].classList.add("captured");
      playSound("clack");
    }, 280);
  }
  await sleep(430);
}

// the whole move for the computer: lift the piece, slide it, put it down
async function animateMove(move) {
  const el = pieceEls[move[0]];

  await liftPiece(el);
  for (let i = 1; i < move.length; i++) {
    await glideTo(el, move[i - 1], move[i]);
  }
  await dropPiece(el);
}

// =====================================================================
// 9. THE HUMAN PLAYS
// =====================================================================

function startsWith(move, shorter) {
  return shorter.every(function (square, i) { return move[i] === square; });
}

// squares the piece may go to next, given the squares chosen so far
function nextSquares() {
  const next = new Set();
  game.legal_moves.forEach(function (move) {
    if (move.length > path.length && startsWith(move, path)) next.add(move[path.length]);
  });
  return Array.from(next);
}

function showTargets() {
  clearHighlights();
  if (path.length === 0) return;
  cellEls[path[path.length - 1]].classList.add("selected");
  nextSquares().forEach(function (pos) { cellEls[pos].classList.add("target"); });
}

function selectPiece(pos) {
  path = [pos];
  holding = null;
  showTargets();
  setMessage(t("pickPiece"), false);
}

function cancelSelection() {
  path = [];
  holding = null;
  clearHighlights();
}

// --- dragging a piece ---

let drag = null;

function onPiecePointerDown(event) {
  if (busy) return;
  const el = event.currentTarget;
  const pos = Number(el.dataset.pos);

  event.preventDefault();
  el.setPointerCapture(event.pointerId);
  selectPiece(pos);

  drag = { el: el, pos: pos, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
  el.onpointermove = onPieceDrag;
  el.onpointerup = onPieceDrop;
  el.onpointercancel = onPieceDrop;
}

function pointerInLayer(event) {
  const origin = layer.getBoundingClientRect();
  return { x: event.clientX - origin.left, y: event.clientY - origin.top };
}

function onPieceDrag(event) {
  if (!drag) return;
  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);

  // a small wiggle is still a click
  if (!drag.moved && distance < 6) return;

  if (!drag.moved) {
    drag.moved = true;
    drag.el.classList.add("dragging", "lifted", "no-anim");
    drag.el.style.zIndex = 99990;
    playSound("lift");
  }

  const spot = pointerInLayer(event);
  drag.el.style.left = spot.x + "px";
  drag.el.style.top = spot.y + "px";
}

async function onPieceDrop(event) {
  if (!drag) return;
  const current = drag;
  drag = null;
  current.el.onpointermove = null;
  current.el.onpointerup = null;
  current.el.onpointercancel = null;

  // it was only a click: the piece stays selected, the player clicks a square next
  if (!current.moved) return;

  current.el.classList.remove("dragging");

  // which allowed square is the piece closest to?
  const spot = pointerInLayer(event);
  const options = nextSquares();
  let bestSquare = null;
  let bestDistance = Infinity;
  options.forEach(function (pos) {
    const centre = cellCentre(pos);
    const distance = Math.hypot(centre.x - spot.x, centre.y - spot.y);
    if (distance < bestDistance) { bestDistance = distance; bestSquare = pos; }
  });
  const reach = pieceSize(current.pos).w * 0.9;

  if (bestSquare !== null && bestDistance < reach) {
    holding = { el: current.el, from: path[path.length - 1] };
    await chooseSquare(bestSquare);
  } else {
    await putBack(current.el, current.pos);
  }
}

// dropped in a wrong place: the piece goes home
async function putBack(el, pos) {
  const home = cellCentre(pos);
  el.classList.remove("no-anim", "lifted");
  el.style.left = home.x + "px";
  el.style.top = home.y + "px";
  await sleep(350);
  el.style.zIndex = Math.round(home.y);
  el.classList.add("shake");
  setTimeout(function () { el.classList.remove("shake"); }, 400);
  setMessage(t("notAllowed"), true);
  cancelSelection();
}

// --- clicking on squares ---

grid.addEventListener("click", function (event) {
  if (busy) return;
  const cell = event.target.closest(".cell");
  if (!cell) return;
  const pos = Number(cell.dataset.pos);

  if (cell.classList.contains("target")) {
    chooseSquare(pos);
  } else if (path.length > 0 && !holding) {
    cancelSelection();
    updateStatus();
  }
});

// --- the player picked a square for the selected piece ---

async function chooseSquare(square) {
  busy = true;
  markMovablePieces();

  const startPos = path[0];
  const el = pieceEls[startPos];

  // if the piece is not lifted yet (click mode), lift it first
  let current = path[path.length - 1];
  if (!holding) {
    await liftPiece(el);
    holding = { el: el, from: current };
  }

  // add this square. If there is only one way to go on, take it automatically.
  const steps = [square];
  path.push(square);
  let matches = game.legal_moves.filter(function (m) { return startsWith(m, path); });
  let finished = matches.find(function (m) { return m.length === path.length; });

  while (!finished) {
    const options = Array.from(new Set(matches.map(function (m) { return m[path.length]; })));
    if (options.length !== 1) break;
    path.push(options[0]);
    steps.push(options[0]);
    matches = game.legal_moves.filter(function (m) { return startsWith(m, path); });
    finished = matches.find(function (m) { return m.length === path.length; });
  }

  // glide the piece through the squares
  let from = current;
  for (let i = 0; i < steps.length; i++) {
    await glideTo(el, from, steps[i]);
    from = steps[i];
  }

  if (finished) {
    await dropPiece(el);
    await sendHumanMove(path.slice());
  } else {
    // the player must choose which way to jump next
    busy = false;
    showTargets();
    setMessage(t("chooseNext"), false);
  }
}

async function sendHumanMove(move) {
  try {
    const data = await post("/api/move", { state: stateForServer(), move: move });
    game = data;
    cancelSelection();
    showLastMove(move);
    renderPieces();
    updateCounts();
    await afterMove();
  } catch (error) {
    busy = false;
    setMessage(t("errorMsg"), true);
    renderPieces();
  }
}

// =====================================================================
// 10. THE COMPUTER PLAYS
// =====================================================================

async function afterMove() {
  if (game.game_over) {
    busy = false;
    markMovablePieces();
    updateStatus();
    await sleep(700);
    showOverlay();
    return;
  }
  if (game.current_player === computer) {
    await computerTurn();
  } else {
    busy = false;
    markMovablePieces();
    updateStatus();
  }
}

async function computerTurn() {
  busy = true;
  markMovablePieces();
  updateStatus();

  try {
    const started = Date.now();
    const data = await post("/api/ai_move", { state: stateForServer(), level: level });

    // always think for a moment, so it feels like a person
    const wait = 900 - (Date.now() - started);
    if (wait > 0) await sleep(wait);

    await animateMove(data.notes.move);

    game = data;
    lastNotes = data.notes;
    showLastMove(data.notes.move);
    renderPieces();
    updateCounts();
    showNotes(lastNotes);
    await afterMoveAfterComputer(data.notes.move);
  } catch (error) {
    busy = false;
    setMessage(t("errorMsg"), true);
    renderPieces();
  }
}

async function afterMoveAfterComputer(move) {
  if (game.game_over) {
    busy = false;
    markMovablePieces();
    updateStatus();
    await sleep(700);
    showOverlay();
    return;
  }
  busy = false;
  markMovablePieces();
  updateStatus();
  setMessage(t("computerMoved") + moveLabel(move) + t("moved") + " " + (game.legal_moves.length && isJump(game.legal_moves[0]) ? t("mustCapture") : t("pickPiece")), false);
}

// =====================================================================
// 11. STATUS, COUNTS, NOTES, GAME OVER
// =====================================================================

function setMessage(text, warn) {
  const box = $("message");
  box.textContent = text;
  box.classList.toggle("warn", !!warn);
}

function sideClass(player) { return player === "b" ? "red" : "ivory"; }

function updateSideLabels() {
  const redWho = human === "b" ? t("you") : t("computer");
  const ivoryWho = human === "w" ? t("you") : t("computer");
  $("labelRed").textContent = t("sideRed") + " (" + redWho + ")";
  $("labelIvory").textContent = t("sideIvory") + " (" + ivoryWho + ")";
  $("agentLine").textContent = AGENT_NAMES[level] + " · " + t(LEVEL_KEYS[level]);
}

function updateStatus() {
  if (!game) return;
  const piece = $("turnPiece");

  if (game.game_over) {
    $("turnText").textContent = "";
    piece.className = "turn-piece";
    return;
  }

  piece.className = "turn-piece " + sideClass(game.current_player);
  if (game.current_player === human) {
    $("turnText").textContent = t("yourTurn");
    const mustJump = game.legal_moves.length > 0 && isJump(game.legal_moves[0]);
    if (path.length === 0) setMessage(mustJump ? t("mustCapture") : t("pickPiece"), mustJump);
  } else {
    $("turnText").textContent = t("computerTurn");
    setMessage(t("thinking"), false);
  }
}

function countText(side) {
  const info = game.counts[side];
  const total = info.men + info.kings;
  return info.kings > 0 ? total + " (" + info.kings + " " + t("kings") + ")" : String(total);
}

function updateCounts() {
  $("countRed").textContent = countText("b");
  $("countIvory").textContent = countText("w");
}

function showNotes(notes) {
  const box = $("notesBody");
  if (!notes) {
    box.innerHTML = "<p>" + t("waiting") + "</p>";
    return;
  }

  let html = "";
  if (notes.level === "easy") {
    html = "<p>" + t("randomNote") + "</p>";
  } else if (notes.level === "medium") {
    html = "<p>" + t("heuristicNote") + "</p>";
  } else {
    html += '<div class="stat"><span>' + t("depthLabel") + "</span><b>" + notes.depth + "</b></div>";
    html += '<div class="stat"><span>' + t("nodesLabel") + "</span><b>" + notes.nodes_visited.toLocaleString() + "</b></div>";
    html += "<p style='margin-top:8px'>" + t("scoresTitle") + "</p>";
    html += scoreListHtml(notes);
  }
  box.innerHTML = html;
}

function scoreText(score) {
  if (score >= 9000) return t("winWord");
  if (score <= -9000) return t("loseWord");
  return String(score);
}

function scoreListHtml(notes) {
  const scores = notes.scores.slice(0, 5);
  const best = scores[0].score;
  const worst = scores[scores.length - 1].score;
  const range = Math.max(1, best - worst);

  let html = '<ul class="score-list">';
  scores.forEach(function (item, index) {
    const width = 12 + 88 * (item.score - worst) / range;
    html += '<li class="' + (index === 0 ? "best" : "") + '"><span class="mv">' + moveLabel(item.move) +
            '</span><span class="bar"><i style="width:' + width + '%"></i></span><span class="val">' + scoreText(item.score) + "</span></li>";
  });
  return html + "</ul>";
}

function fillOverlay() {
  let title, text;
  if (game.winner === null) {
    title = t("drawTitle"); text = t("drawText");
  } else if (game.winner === human) {
    title = t("youWon"); text = t("youWonText");
  } else {
    title = t("youLost"); text = t("youLostText");
  }
  $("overlayTitle").textContent = title;
  $("overlayText").textContent = text;
}

function showOverlay() {
  fillOverlay();
  $("overlay").classList.add("show");
}

// =====================================================================
// 12. STARTING A GAME
// =====================================================================

async function startGame() {
  level = chosenLevel;
  human = chosenSide;
  computer = human === "b" ? "w" : "b";
  flip = human === "b";                      // your pieces always at the bottom

  $("overlay").classList.remove("show");
  showView("game");
  busy = true;
  path = [];
  holding = null;
  lastNotes = null;

  try {
    game = await post("/api/new");
  } catch (error) {
    setMessage(t("errorMsg"), true);
    return;
  }

  buildBoard();
  showLastMove(null);
  renderPieces();
  updateSideLabels();
  updateCounts();
  showNotes(null);
  updateStatus();

  if (game.current_player === computer) {
    await sleep(500);
    await computerTurn();
  } else {
    busy = false;
    markMovablePieces();
  }
}

// =====================================================================
// 13. BUTTONS AND START-UP
// =====================================================================

function pickOne(containerId, attribute, onPick) {
  const container = $(containerId);
  container.addEventListener("click", function (event) {
    const card = event.target.closest("[data-" + attribute + "]");
    if (!card) return;
    container.querySelectorAll(".selected").forEach(function (el) { el.classList.remove("selected"); });
    card.classList.add("selected");
    onPick(card.dataset[attribute]);
  });
}

pickOne("agentGrid", "level", function (value) { chosenLevel = value; });
pickOne("sidePick", "side", function (value) { chosenSide = value; });

$("playBtn").addEventListener("click", startGame);
$("againBtn").addEventListener("click", startGame);
$("newGameBtn").addEventListener("click", startGame);
$("homeBtn").addEventListener("click", goHome);
$("overlayHomeBtn").addEventListener("click", goHome);
$("backBtn").addEventListener("click", goHome);

$("langMm").addEventListener("click", function () { setLanguage("mm"); });
$("langEn").addEventListener("click", function () { setLanguage("en"); });

$("soundBtn").addEventListener("click", function () {
  muted = !muted;
  document.body.classList.toggle("muted", muted);
  try { localStorage.setItem("kyar-muted", muted ? "1" : "0"); } catch (e) { /* ignore */ }
});

// when the window changes size, draw the pieces again in the right places
window.addEventListener("resize", function () {
  if (game && !busy && document.body.classList.contains("view-game")) renderPieces();
});

// remembered choices from last time
try {
  const savedLang = localStorage.getItem("kyar-lang");
  if (savedLang === "en" || savedLang === "mm") lang = savedLang;
  if (localStorage.getItem("kyar-muted") === "1") {
    muted = true;
    document.body.classList.add("muted");
  }
} catch (e) { /* ignore */ }

applyLanguage();