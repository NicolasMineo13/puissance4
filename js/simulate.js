var timing = 30;
const timingIncrement = 75;
var simulationInProgress = false;

function simulateHorizontalWin() {
    if (simulationInProgress) {
        console.log("La simulation est déjà en cours.");
        return;
    }

    simulationInProgress = true;

    resetBoard(rows, cols, true);

    // Désactiver temporairement les clics sur le plateau
    gameBoard.style.pointerEvents = "none";

    currentPlayer = Math.floor(Math.random() * 2) + 1;

    const direction = Math.floor(Math.random() * 2) + 1;

    if (direction == 1) {
        const col = Math.floor(Math.random() * 4);

        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 3), timing);
        timing += timingIncrement;
    } else if (direction == 2) {
        // Déclarer une position entre 3 et 6
        const col = Math.floor(Math.random() * 4) + 3;

        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 3), timing);
        timing += timingIncrement;
    }

    // À la fin de la simulation, réinitialisez la variable simulationInProgress
    setTimeout(() => {
        simulationInProgress = false;
        // Réactiver les clics sur le plateau
        gameBoard.style.pointerEvents = "auto";
    }, 3000);
}

function simulateVerticalWin() { // Comme horizontal mais avec les lignes
    if (simulationInProgress) {
        console.log("La simulation est déjà en cours.");
        return;
    }

    simulationInProgress = true;

    resetBoard(rows, cols, true);

    // Désactiver temporairement les clics sur le plateau
    gameBoard.style.pointerEvents = "none";

    currentPlayer = Math.floor(Math.random() * 2) + 1;

    const col = Math.floor(Math.random() * 7);

    if (col + 1 > 6) {
        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
    } else {
        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
    }

    // À la fin de la simulation, réinitialisez la variable simulationInProgress
    setTimeout(() => {
        simulationInProgress = false;
        // Réactiver les clics sur le plateau
        gameBoard.style.pointerEvents = "auto";
    }, 3000);
}

function simulateDiagonalWin() { // Comme horizontal mais avec les diagonales
    if (simulationInProgress) {
        console.log("La simulation est déjà en cours.");
        return;
    }

    simulationInProgress = true;

    resetBoard(rows, cols, true);

    // Désactiver temporairement les clics sur le plateau
    gameBoard.style.pointerEvents = "none";

    currentPlayer = Math.floor(Math.random() * 2) + 1;

    console.log("Joueur : " + currentPlayer);

    const direction = Math.floor(Math.random() * 2) + 1;

    console.log("Direction : " + direction);

    if (direction == 1) {
        // La col est entre 0 et 3
        const col = Math.floor(Math.random() * 4);

        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 3), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 3), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col + 3), timing);
        timing += timingIncrement;

        if (col < 3) {
            setTimeout(() => simulatePlaceToken(col + 4), timing);
            timing += timingIncrement;
        }

        if (col == 3) {
            setTimeout(() => simulatePlaceToken(col - 1), timing);
            timing += timingIncrement;
        }

        setTimeout(() => simulatePlaceToken(col + 3), timing);
        timing += timingIncrement;
    }
    else if (direction == 2) {
        // Déclarer une position entre 3 et 6
        const col = Math.floor(Math.random() * 4) + 3;

        simulatePlaceToken(col);
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 3), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 2), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 3), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col - 3), timing);
        timing += timingIncrement;

        if (col < 6) {
            setTimeout(() => simulatePlaceToken(col + 1), timing);
            timing += timingIncrement;
        }

        if (col == 6) {
            setTimeout(() => simulatePlaceToken(col - 4), timing);
            timing += timingIncrement;
        }

        setTimeout(() => simulatePlaceToken(col - 3), timing);
        timing += timingIncrement;
    }

    // À la fin de la simulation, réinitialisez la variable simulationInProgress
    setTimeout(() => {
        simulationInProgress = false;
        // Réactiver les clics sur le plateau
        gameBoard.style.pointerEvents = "auto";
    }, 3000);
}

function simulateFullBoard() {
    if (simulationInProgress) {
        console.log("La simulation est déjà en cours.");
        return;
    }

    simulationInProgress = true;

    resetBoard(rows, cols, true);

    // Désactiver temporairement les clics sur le plateau
    gameBoard.style.pointerEvents = "none";

    currentPlayer = Math.floor(Math.random() * 2) + 1;

    const col = 0;

    /* 1ere ligne */

    simulatePlaceToken(col);

    // Pour 6 fois (nombre de lignes restantes) on place un jeton dans la colonne col+1
    for (let i = 1; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(col + i), timing);
        timing += timingIncrement;
    }

    /* 2eme ligne */

    // Pour 7 fois (nombre de colonnes) on place un jeton dans la colonne col+1
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 3eme ligne */

    // Pour 7 fois (nombre de colonnes) on place un jeton dans la colonne col+1
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 4eme ligne */

    setTimeout(() => simulatePlaceToken(1), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(0), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(3), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(2), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(5), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(4), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(0), timing);
    timing += timingIncrement;
    setTimeout(() => simulatePlaceToken(6), timing);
    timing += timingIncrement;

    /* 5eme ligne */

    // Pour 7 fois(nombre de colonnes) on place un jeton dans la colonne col + 1
    for (let i = 1; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 6eme ligne */
    // Pour 7 fois (nombre de colonnes) on place un jeton dans la colonne col+1
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    // À la fin de la simulation, réinitialisez la variable simulationInProgress
    setTimeout(() => {
        simulationInProgress = false;
        // Réactiver les clics sur le plateau
        gameBoard.style.pointerEvents = "auto";
    }, timing);
}

function simulatePlaceToken(col_param) {
    placeToken(col_param, true);
}