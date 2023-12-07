QUnit.test("initializeBoard function test", function (assert) {
    const rows = 6;
    const cols = 7;

    initializeBoard(rows, cols);

    assert.strictEqual(gameBoard.style.getPropertyValue('--rows'), rows.toString(), "Rows are set correctly");
    assert.strictEqual(gameBoard.style.getPropertyValue('--cols'), cols.toString(), "Cols are set correctly");
    assert.strictEqual(boardState.length, rows, "Board state rows are initialized correctly");
    assert.strictEqual(boardState[0].length, cols, "Board state cols are initialized correctly");
    assert.strictEqual(currentPlayer, 2, "Current player is set correctly");
    assert.strictEqual(gameWon, false, "Game won is initialized correctly");
    assert.strictEqual(player1Turn.innerHTML, "À votre tour", "Player 1 turn is initialized correctly");
    assert.strictEqual(player2Turn.innerHTML, "À votre tour", "Player 2 turn is initialized correctly");
    const cells = document.getElementsByClassName("cell");
    assert.strictEqual(cells.length, rows * cols, "All cells are created");
});

QUnit.test("createCell function test", function (assert) {
    const row = 2;
    const col = 1;

    const cell = createCell(row, col);

    assert.ok(cell instanceof HTMLElement, "Cell is created as an HTML element");
    assert.ok(cell.classList.contains("cell"), "Cell has 'cell' class");
    assert.strictEqual(cell.dataset.row, row.toString(), "Cell has correct 'data-row' attribute");
    assert.strictEqual(cell.dataset.col, col.toString(), "Cell has correct 'data-col' attribute");
});

QUnit.test("resetBoard function test", function (assert) {
    const rows = 6;
    const cols = 7;

    const gameBoard = document.getElementById('game-board');
    const replayButton = document.getElementById('replay-button');
    const winMessage = document.getElementById('winmessage');

    resetBoard(rows, cols);

    assert.ok(replayButton.classList.contains("visibilityhidden"), "Replay button is hidden");
    assert.ok(winMessage.classList.contains("visibilityhidden"), "Win message is hidden");
    assert.strictEqual(winMessage.innerHTML, "", "Win message is cleared");
    assert.strictEqual(gameBoard.style.getPropertyValue('--rows'), rows.toString(), "Rows are set correctly");
    assert.strictEqual(gameBoard.style.getPropertyValue('--cols'), cols.toString(), "Cols are set correctly");
    assert.strictEqual(boardState.length, rows, "Board state rows are initialized correctly");
    assert.strictEqual(boardState[0].length, cols, "Board state cols are initialized correctly");
    assert.strictEqual(timing, 0, "Timing is set correctly");
});

QUnit.test("isBoardFull function test", function (assert) {
    const rows = 3;
    const cols = 3;

    const boardFull = isBoardFull(rows, cols);

    assert.strictEqual(boardFull, false, "Board is not full when there are empty cells");

    boardState = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 2, 1]
    ];

    const boardFullAfterFilling = isBoardFull(rows, cols);

    assert.strictEqual(boardFullAfterFilling, true, "Board is full when all cells are filled");
});

QUnit.test("getAvailableRow function test", function (assert) {
    const rows = 3;
    const cols = 3;

    boardState = [
        [1, 2, 1],
        [2, 0, 2],
        [1, 0, 1]
    ];

    const availableRow = getAvailableRow(1, rows);

    assert.strictEqual(availableRow, 2, "Available row is correct when there is an empty cell in the specified column");

    boardState = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 2, 1]
    ];

    const unavailableRow = getAvailableRow(1, rows);

    assert.strictEqual(unavailableRow, -1, "No available row when the column is full");
});

// TEst pour le changement de joueur
QUnit.test("swapPlayerTurn function test", function (assert) {

    currentPlayer = 1;

    swapPlayerTurn(currentPlayer);

    assert.strictEqual(currentPlayer, 2, "Current player is changed to 2");

    swapPlayerTurn(currentPlayer);

    assert.strictEqual(currentPlayer, 1, "Current player is changed to 1");
});

QUnit.test("blinkPlayerTurn function test", function (assert) {
    const player1Turn = document.getElementById('player1-turn');
    const player2Turn = document.getElementById('player2-turn');
    const player1Panel = document.getElementById('player1-panel');
    const player2Panel = document.getElementById('player2-panel');

    blinkPlayerTurn(1);

    assert.ok(!player1Turn.classList.contains("visibilityhidden"), "Player 1 turn is visible");
    assert.ok(player2Turn.classList.contains("visibilityhidden"), "Player 2 turn is hidden");
    assert.ok(player1Panel.classList.contains("blink"), "Player 1 panel is blinking");
    assert.ok(!player2Panel.classList.contains("blink"), "Player 2 panel is not blinking");

    blinkPlayerTurn(2);

    assert.ok(player1Turn.classList.contains("visibilityhidden"), "Player 1 turn is hidden");
    assert.ok(!player2Turn.classList.contains("visibilityhidden"), "Player 2 turn is visible");
    assert.ok(!player1Panel.classList.contains("blink"), "Player 1 panel is not blinking");
    assert.ok(player2Panel.classList.contains("blink"), "Player 2 panel is blinking");
});

QUnit.test("checkWin horizontal function test", function (assert) {
    const rows = 6;
    const cols = 7;

    currentPlayer = 2;

    boardState = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0],
        [2, 2, 2, 2, 0, 0, 0]
    ];

    const cells = document.getElementsByClassName("cell");
    cells[28].classList.add("player1-token-played");
    cells[29].classList.add("player1-token-played");
    cells[30].classList.add("player1-token-played");
    cells[35].classList.add("player2-token-played");
    cells[36].classList.add("player2-token-played");
    cells[37].classList.add("player2-token-played");
    cells[38].classList.add("player2-token-played");

    const win = checkWin(currentPlayer, 5, 3);

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("player1-token-played");
        cells[i].classList.remove("player2-token-played");
    }

    assert.strictEqual(win.type, "horizontal", "Horizontal win is detected");
    assert.strictEqual(win.cells.length, 4, "Winning cells are detected");
});

QUnit.test("checkWin vertical function test", function (assert) {
    const rows = 6;
    const cols = 7;

    currentPlayer = 2;

    boardState = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0, 0]
    ];

    const cells = document.getElementsByClassName("cell");
    cells[15].classList.add("player2-token-played");
    cells[21].classList.add("player2-token-played");
    cells[28].classList.add("player2-token-played");
    cells[35].classList.add("player2-token-played");
    cells[36].classList.add("player1-token-played");
    cells[29].classList.add("player1-token-played");
    cells[22].classList.add("player1-token-played");

    const win = checkWin(currentPlayer, 2, 0);

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("player1-token-played");
        cells[i].classList.remove("player2-token-played");
    }

    assert.strictEqual(win.type, "vertical", "Vertical win is detected");
    assert.strictEqual(win.cells.length, 4, "Winning cells are detected");
});

QUnit.test("checkWin diagonal function test", function (assert) {
    const rows = 6;
    const cols = 7;

    currentPlayer = 2;

    boardState = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0],
        [0, 0, 2, 2, 0, 0, 0],
        [0, 2, 1, 1, 0, 0, 0],
        [2, 1, 1, 2, 1, 0, 0]
    ];

    const cells = document.getElementsByClassName("cell");

    cells[38].classList.add("player2-token-played");
    cells[35].classList.add("player2-token-played");
    cells[29].classList.add("player2-token-played");
    cells[23].classList.add("player2-token-played");
    cells[24].classList.add("player2-token-played");
    cells[17].classList.add("player2-token-played");

    cells[39].classList.add("player1-token-played");
    cells[37].classList.add("player1-token-played");
    cells[36].classList.add("player1-token-played");
    cells[31].classList.add("player1-token-played");
    cells[30].classList.add("player1-token-played");

    const win = checkWin(currentPlayer, 2, 3);

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("player1-token-played");
        cells[i].classList.remove("player2-token-played");
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("player1-token-played");
        cells[i].classList.remove("player2-token-played");
    }

    assert.strictEqual(win.type, "diagonal", "Diagonal win is detected");
    assert.strictEqual(win.cells.length, 4, "Winning cells are detected");
});

QUnit.test("showReplayButton function test", function (assert) {
    const replayButton = document.getElementById('replay-button');

    showReplayButton();

    assert.ok(!replayButton.classList.contains("visibilityhidden"), "Replay button is visible");
    assert.strictEqual(simulationInProgress, false, "Simulation in progress is false");
    assert.strictEqual(gameBoard.style.pointerEvents, "auto", "Game board pointer events is auto");
});