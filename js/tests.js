QUnit.test("initializeBoard function test", function (assert) {
    // Arrange
    const rows = 6;
    const cols = 7;

    // Act
    initializeBoard(rows, cols, true);

    // Assert
    assert.strictEqual(gameBoard.style.getPropertyValue('--rows'), rows.toString(), "Rows are set correctly");
    assert.strictEqual(gameBoard.style.getPropertyValue('--cols'), cols.toString(), "Cols are set correctly");
    assert.strictEqual(boardState.length, rows, "Board state rows are initialized correctly");
    assert.strictEqual(boardState[0].length, cols, "Board state cols are initialized correctly");
    assert.strictEqual(currentPlayer, 2, "Current player is set correctly");
    assert.strictEqual(gameWon, false, "Game won is initialized correctly");
    assert.strictEqual(player1Turn.innerHTML, "À votre tour", "Player 1 turn is initialized correctly");
    assert.strictEqual(player2Turn.innerHTML, "À votre tour", "Player 2 turn is initialized correctly");
});

QUnit.test("createCell function test", function (assert) {
    // Arrange
    const row = 2;
    const col = 1;

    // Act
    const cell = createCell(row, col);

    // Assert
    assert.ok(cell instanceof HTMLElement, "Cell is created as an HTML element");
    assert.ok(cell.classList.contains("cell"), "Cell has 'cell' class");
    assert.strictEqual(cell.dataset.row, row.toString(), "Cell has correct 'data-row' attribute");
    assert.strictEqual(cell.dataset.col, col.toString(), "Cell has correct 'data-col' attribute");
});

QUnit.test("resetBoard function test", function (assert) {
    // Arrange
    const rows = 6;
    const cols = 7;

    // Assume that these elements are defined in your HTML or mocked appropriately
    const gameBoard = document.getElementById('game-board'); // Replace with your actual ID
    const replayButton = document.getElementById('replay-button'); // Replace with your actual ID
    const winMessage = document.getElementById('winmessage'); // Replace with your actual ID

    // Act
    resetBoard(rows, cols, true);

    // Assert
    assert.ok(replayButton.classList.contains("visibilityhidden"), "Replay button is hidden");
    assert.ok(winMessage.classList.contains("visibilityhidden"), "Win message is hidden");
    assert.strictEqual(winMessage.innerHTML, "", "Win message is cleared");
    assert.strictEqual(gameBoard.style.getPropertyValue('--rows'), rows.toString(), "Rows are set correctly");
    assert.strictEqual(gameBoard.style.getPropertyValue('--cols'), cols.toString(), "Cols are set correctly");
    assert.strictEqual(boardState.length, rows, "Board state rows are initialized correctly");
    assert.strictEqual(boardState[0].length, cols, "Board state cols are initialized correctly");
});

QUnit.test("isBoardFull function test", function (assert) {
    // Arrange
    const rows = 3;
    const cols = 3;

    // Act
    const boardFull = isBoardFull(rows, cols);

    // Assert
    assert.strictEqual(boardFull, false, "Board is not full when there are empty cells");

    // Modify the board to be full
    boardState = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 2, 1]
    ];

    // Act again
    const boardFullAfterFilling = isBoardFull(rows, cols);

    // Assert again
    assert.strictEqual(boardFullAfterFilling, true, "Board is full when all cells are filled");
});