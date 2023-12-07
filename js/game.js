function checkWin(player_param, row_param, col_param) {
    const horizontalWin = isHorizontalWin(player_param, row_param);
    const verticalWin = isVerticalWin(player_param, col_param);
    const diagonalWin = isDiagonalWin(player_param, row_param, col_param);
    if (horizontalWin) {
        return { type: 'horizontal', cells: getWinningCells(row_param, col_param, 'horizontal') };
    } else if (verticalWin) {
        return { type: 'vertical', cells: getWinningCells(row_param, col_param, 'vertical') };
    } else if (diagonalWin) {
        return { type: 'diagonal', cells: getWinningCells(row_param, col_param, 'diagonal') };
    }
    return false;
}

function isHorizontalWin(player_param, row_param) {
    for (let col = 0; col <= cols - 4; col++) {
        if (
            boardState[row_param][col] === player_param &&
            boardState[row_param][col + 1] === player_param &&
            boardState[row_param][col + 2] === player_param &&
            boardState[row_param][col + 3] === player_param
        ) {
            return true;
        }
    }
    return false;
}

function isVerticalWin(player_param, col_param) {
    for (let row = 0; row <= rows - 4; row++) {
        if (
            boardState[row][col_param] === player_param &&
            boardState[row + 1][col_param] === player_param &&
            boardState[row + 2][col_param] === player_param &&
            boardState[row + 3][col_param] === player_param
        ) {
            return true;
        }
    }
    return false;
}

function isDiagonalWin(player_param, row_param, col_param) {
    for (let i = -1; i <= 1; i += 2) {
        if (
            checkDiagonalSegment(player_param, row_param, col_param, i, 1) ||
            checkDiagonalSegment(player_param, row_param, col_param, i, -1)
        ) {
            return true;
        }
    }
    return false;
}

function checkDiagonalSegment(player_param, row_param, col_param, rowDirection_param, colDirection_param) {
    for (let i = 0; i < 4; i++) {
        const currentRow = row_param + i * rowDirection_param;
        const currentCol = col_param + i * colDirection_param;
        if (
            !isInBounds(currentRow, currentCol) ||
            boardState[currentRow][currentCol] !== player_param
        ) {
            return false;
        }
    }
    return true;
}

function isInBounds(row_param, col_param) {
    return row_param >= 0 && row_param < rows && col_param >= 0 && col_param < cols;
}

function getWinningCells(row_param, col_param, type_param) {
    const winningCells = [];
    switch (type_param) {
        case 'horizontal':
            for (let i = -1; i <= 1; i += 2) {
                const winningSegment = getHorizontalSegment(row_param, col_param, i);
                if (winningSegment && winningSegment.every(cell => cell.classList.contains(`player${currentPlayer}-token-played`))) {
                    winningCells.push(...winningSegment);
                }
            }
            break;
        case 'vertical':
            for (let r = row_param; r < row_param + 4; r++) {
                winningCells.push(getCell(r, col_param));
            }
            break;
        case 'diagonal':
            for (let i = -1; i <= 1; i += 2) {
                const winningSegment = getDiagonalSegment(row_param, col_param, i, 1);
                if (winningSegment && winningSegment.every(cell => cell.classList.contains(`player${currentPlayer}-token-played`))) {
                    winningCells.push(...winningSegment);
                }

                const otherWinningSegment = getDiagonalSegment(row_param, col_param, i, -1);
                if (otherWinningSegment && otherWinningSegment.every(cell => cell.classList.contains(`player${currentPlayer}-token-played`))) {
                    winningCells.push(...otherWinningSegment);
                }
            }
            break;
        default:
            break;
    }
    return winningCells;
}

function getHorizontalSegment(row_param, col_param, colDirection_param) {
    const segment = [];
    for (let i = 0; i < 4; i++) {
        const currentCol = col_param + i * colDirection_param;
        if (!isInBounds(row_param, currentCol)) {
            return null;
        }
        segment.push(getCell(row_param, currentCol));
    }
    return segment;
}

function getDiagonalSegment(row_param, col_param, rowDirection_param, colDirection_param) {
    const segment = [];
    for (let i = 0; i < 4; i++) {
        const currentRow = row_param + i * rowDirection_param;
        const currentCol = col_param + i * colDirection_param;
        if (!isInBounds(currentRow, currentCol)) {
            return null;
        }
        segment.push(getCell(currentRow, currentCol));
    }
    return segment;
}

function getCell(row_param, col_param) {
    return document.getElementById(`cell-${row_param}-${col_param}`);
}

function showReplayButton() {
    replayButton.classList.remove("visibilityhidden");
    simulationInProgress = false;
    gameBoard.style.pointerEvents = "auto";
    buttonSimulateHorizontal.addEventListener("click", simulateHorizontalWin);
    buttonSimulateVertical.addEventListener("click", simulateVerticalWin);
    buttonSimulateDiagonal.addEventListener("click", simulateDiagonalWin);
    buttonSimulateFullBoard.addEventListener("click", simulateFullBoard);
}