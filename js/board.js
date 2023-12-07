function initializeBoard(rows_param, cols_param, simulate_param = false) {
    rows = rows_param;
    gameBoard.style.setProperty('--rows', rows);
    cols = cols_param;
    gameBoard.style.setProperty('--cols', cols_param);
    boardState = [];
    gameWon = false;
    player1Turn.innerHTML = "À votre tour";
    player2Turn.innerHTML = "À votre tour";
    buttonSimulateHorizontal.addEventListener("click", simulateHorizontalWin);
    buttonSimulateVertical.addEventListener("click", simulateVerticalWin);
    buttonSimulateDiagonal.addEventListener("click", simulateDiagonalWin);
    buttonSimulateFullBoard.addEventListener("click", simulateFullBoard);

    for (let i = 0; i < rows; i++) {
        boardState.push(Array(cols).fill(0));
        for (let j = 0; j < cols; j++) {
            const cell = createCell(i, j);
            gameBoard.appendChild(cell);
        }
    }

    if (!currentPlayer) {
        currentPlayer = 2;
    }

    if (!simulate_param)
        blinkPlayerTurn(currentPlayer);

    replayButton.addEventListener("click", () => resetBoard(rows, cols));
}

function createCell(row_param, col_param) {
    const cell = document.createElement("div");
    cell.id = "cell-" + row_param + "-" + col_param;
    cell.classList.add("cell");
    cell.dataset.row = row_param;
    cell.dataset.col = col_param;
    cell.addEventListener("click", () => placeToken(col_param));
    return cell;
}

function resetBoard(rows_param, cols_param, simulate_param = false) {
    gameBoard.innerHTML = "";
    replayButton.classList.add("visibilityhidden");
    winMessage.classList.add("visibilityhidden");
    winMessage.innerHTML = "";
    removeBlinkAnimation();
    timing = 30;
    initializeBoard(rows_param, cols_param, simulate_param);
}

function isBoardFull(rows_param, cols_param) {
    for (let i = 0; i < rows_param; i++) {
        for (let j = 0; j < cols_param; j++) {
            if (boardState[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function getAvailableRow(col_param, rows_param) {
    for (let i = rows_param - 1; i >= 0; i--) {
        if (boardState[i][col_param] === 0) {
            return i;
        }
    }
    return -1;
}