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
    const cells = document.getElementsByClassName("cell");
    assert.strictEqual(cells.length, rows * cols, "All cells are created");
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
    assert.strictEqual(timing, 30, "Timing is set correctly");
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

QUnit.test("getAvailableRow function test", function (assert) {
    // Arrange
    const rows = 3;
    const cols = 3;

    // Assume that these variables are initialized appropriately
    boardState = [
        [1, 2, 1],
        [2, 0, 2],
        [1, 0, 1]
    ];

    // Act
    const availableRow = getAvailableRow(1, rows);

    // Assert
    assert.strictEqual(availableRow, 2, "Available row is correct when there is an empty cell in the specified column");

    // Modify the board to have the column full
    boardState = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 2, 1]
    ];

    // Act again
    const unavailableRow = getAvailableRow(1, rows);

    // Assert again
    assert.strictEqual(unavailableRow, -1, "No available row when the column is full");
});

QUnit.test("blinkPlayerTurn function test", function (assert) {
    // Arrange
    // Assume that these variables are initialized appropriately
    const player1Turn = document.getElementById('player1-turn'); // Replace with your actual ID
    const player2Turn = document.getElementById('player2-turn'); // Replace with your actual ID
    const player1Panel = document.getElementById('player1-panel'); // Replace with your actual ID
    const player2Panel = document.getElementById('player2-panel'); // Replace with your actual ID

    // Act
    blinkPlayerTurn(1);

    // Assert
    assert.ok(!player1Turn.classList.contains("visibilityhidden"), "Player 1 turn is visible");
    assert.ok(player2Turn.classList.contains("visibilityhidden"), "Player 2 turn is hidden");
    assert.ok(player1Panel.classList.contains("blink"), "Player 1 panel is blinking");
    assert.ok(!player2Panel.classList.contains("blink"), "Player 2 panel is not blinking");

    // Act again with player 2
    blinkPlayerTurn(2);

    // Assert again
    assert.ok(player1Turn.classList.contains("visibilityhidden"), "Player 1 turn is hidden");
    assert.ok(!player2Turn.classList.contains("visibilityhidden"), "Player 2 turn is visible");
    assert.ok(!player1Panel.classList.contains("blink"), "Player 1 panel is not blinking");
    assert.ok(player2Panel.classList.contains("blink"), "Player 2 panel is blinking");
});

// function checkWin(player_param, row_param, col_param) {
//     const horizontalWin = isHorizontalWin(player_param, row_param);
//     const verticalWin = isVerticalWin(player_param, col_param);
//     const diagonalWin = isDiagonalWin(player_param, row_param, col_param);

//     if (horizontalWin) {
//         return { type: 'horizontal', cells: getWinningCells(row_param, col_param, 'horizontal') };
//     } else if (verticalWin) {
//         return { type: 'vertical', cells: getWinningCells(row_param, col_param, 'vertical') };
//     } else if (diagonalWin) {
//         return { type: 'diagonal', cells: getWinningCells(row_param, col_param, 'diagonal') };
//     }

//     return false;
// }

// function isHorizontalWin(player_param, row_param) {
//     for (let col = 0; col <= cols - 4; col++) {
//         if (
//             boardState[row_param][col] === player_param &&
//             boardState[row_param][col + 1] === player_param &&
//             boardState[row_param][col + 2] === player_param &&
//             boardState[row_param][col + 3] === player_param
//         ) {
//             return true;
//         }
//     }
//     return false;
// }

// Test de checkWin
QUnit