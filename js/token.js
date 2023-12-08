function placeToken(col_param, simulate_param = false) {
    if (gameWon || animationInProgress) {
        return;
    }

    const row = getAvailableRow(col_param, rows);

    if (row === -1) {
        return;
    }

    const cell = document.querySelector(`[data-row='${row}'][data-col='${col_param}']`);

    cell.classList.add(`player${currentPlayer}-token-played`);

    const pieceDiv = document.createElement('div');
    pieceDiv.classList.add(`player${currentPlayer}-token`);

    if (simulate_param) {
        pieceDiv.classList.add('falling-piece-simulate');
    } else {
        pieceDiv.classList.add('falling-piece');
    }

    cell.insertAdjacentElement('afterbegin', pieceDiv);

    animationInProgress = true;

    pieceDiv.addEventListener('animationend', () => {

        if (simulate_param) {
            pieceDiv.classList.remove('falling-piece-simulate');
        } else {
            pieceDiv.classList.remove('falling-piece');
        }

        boardState[row][col_param] = currentPlayer;

        const winResult = checkWin(currentPlayer, row, col_param);

        if (winResult) {
            gameWon = true;

            player1Turn.classList.add("visibilityhidden");
            player2Turn.classList.add("visibilityhidden");

            player1Panel.classList.remove("blink");
            player2Panel.classList.remove("blink");

            applyBlinkAnimation(winResult.cells);

            return;
        }

        if (isBoardFull(rows, cols)) {
            showReplayButton();
            winMessage.innerHTML = "Match nul !";
            winMessage.classList.remove("visibilityhidden");

            removeBlinkAnimation();

            player1Turn.classList.add("visibilityhidden");
            player2Turn.classList.add("visibilityhidden");

            animationInProgress = false;
            return;
        }

        swapPlayerTurn(currentPlayer, simulate_param);

        animationInProgress = false;

    }, { once: true });
}

function applyBlinkAnimation(winningCells_param) {
    winningCells_param.forEach((cell) => {
        cell.firstChild.classList.add("blink");
    });

    setTimeout(() => {
        removeBlinkAnimation();
        winMessage.innerHTML = `Le Joueur ${currentPlayer} a gagné !`;
        winMessage.classList.remove("visibilityhidden");
        showReplayButton();
        animationInProgress = false;
    }, 2500);
}

function removeBlinkAnimation() {
    const blinkingElements = document.querySelectorAll(".blink");
    blinkingElements.forEach((element) => {
        element.classList.remove("blink");
    });
}