function simulateHorizontalWin() {
    launchSimulation();
    if (direction == 1) {
        const col = Math.floor(Math.random() * 4);
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
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
        return true;
    } else if (direction == 2) {
        const col = Math.floor(Math.random() * 4) + 3;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
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
        return true;
    }
}

function simulateVerticalWin() {
    launchSimulation();
    const col = Math.floor(Math.random() * 7);
    if (col + 1 > 6) {
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
        setTimeout(() => simulatePlaceToken(col - 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
    } else {
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
        setTimeout(() => simulatePlaceToken(col + 1), timing);
        timing += timingIncrement;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
    }
}

function simulateDiagonalWin() {
    launchSimulation();
    if (direction == 1) {
        const col = Math.floor(Math.random() * 4);
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
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
        const col = Math.floor(Math.random() * 4) + 3;
        setTimeout(() => simulatePlaceToken(col), timing);
        timing += timingIncrement;
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
}

function simulateFullBoard() {
    launchSimulation();

    /* 1ere ligne */
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 2eme ligne */
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 3eme ligne */
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
    for (let i = 1; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }

    /* 6eme ligne */
    for (let i = 0; i < 7; i++) {
        setTimeout(() => simulatePlaceToken(i), timing);
        timing += timingIncrement;
    }
}

function launchSimulation() {
    if (simulationInProgress) {
        console.log("La simulation est déjà en cours.");
        return;
    }
    resetBoard(rows, cols, true);
    simulationInProgress = true;
    gameBoard.style.pointerEvents = "none";
    currentPlayer = Math.floor(Math.random() * 2) + 1;
    direction = Math.floor(Math.random() * 2) + 1;
    buttonSimulateHorizontal.removeEventListener("click", simulateHorizontalWin);
    buttonSimulateVertical.removeEventListener("click", simulateVerticalWin);
    buttonSimulateDiagonal.removeEventListener("click", simulateDiagonalWin);
    buttonSimulateFullBoard.removeEventListener("click", simulateFullBoard);
}

function simulatePlaceToken(col_param) {
    placeToken(col_param, true);
}