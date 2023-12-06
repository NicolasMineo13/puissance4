let animationInProgress = false;

function placeToken(col_param, simulate_param = false) {
    if (gameWon || animationInProgress) {
        return;
    }

    const row = getAvailableRow(col_param, rows);

    if (row === -1) {
        return;
    }

    const cell = document.querySelector(`[data-row='${row}'][data-col='${col_param}']`);

    // Ajouter la classe player${currentPlayer}-token-played à la cellule
    cell.classList.add(`player${currentPlayer}-token-played`);

    // Créez une nouvelle div pour la pièce
    const pieceDiv = document.createElement('div');
    pieceDiv.classList.add(`player${currentPlayer}-token`);

    if (simulate_param) {
        pieceDiv.classList.add('falling-piece-simulate');
    } else {
        pieceDiv.classList.add('falling-piece');
    }

    // Ajoutez la nouvelle div à côté de la cellule principale
    cell.insertAdjacentElement('afterbegin', pieceDiv);

    animationInProgress = true;

    // Ajoutez un gestionnaire d'événements pour l'événement 'animationend'
    pieceDiv.addEventListener('animationend', () => {
        // Retirez la classe falling-piece après l'animation

        if (simulate_param) {
            pieceDiv.classList.remove('falling-piece-simulate');
        } else {
            pieceDiv.classList.remove('falling-piece');
        }

        // Update the board state
        boardState[row][col_param] = currentPlayer;

        const winResult = checkWin(currentPlayer, row, col_param);

        if (winResult) {
            gameWon = true; // Set the game as won

            player1Turn.classList.add("visibilityhidden");
            player2Turn.classList.add("visibilityhidden");

            player1Panel.classList.remove("blink");
            player2Panel.classList.remove("blink");

            applyBlinkAnimation(winResult.cells); // Show the replay button

            animationInProgress = false;

            return;
        }

        if (isBoardFull(rows, cols)) {
            showReplayButton(); // Show the replay button
            winMessage.innerHTML = "Match nul !";
            winMessage.classList.remove("visibilityhidden");

            removeBlinkAnimation();

            player1Turn.classList.add("visibilityhidden");
            player2Turn.classList.add("visibilityhidden");

            animationInProgress = false;
            return;
        }

        // Switch to the other player
        currentPlayer = currentPlayer === 1 ? 2 : 1;

        if (!simulate_param)
            blinkPlayerTurn(currentPlayer);

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
    }, 2500);
}

function removeBlinkAnimation() {
    const blinkingElements = document.querySelectorAll(".blink");
    blinkingElements.forEach((element) => {
        element.classList.remove("blink");
    });
}