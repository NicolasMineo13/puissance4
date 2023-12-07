initializeBoard(6, 7);
buttonSimulateHorizontal.addEventListener("click", simulateHorizontalWin);
buttonSimulateVertical.addEventListener("click", simulateVerticalWin);
buttonSimulateDiagonal.addEventListener("click", simulateDiagonalWin);
buttonSimulateFullBoard.addEventListener("click", simulateFullBoard);
buttonReset.addEventListener("click", () => viderPlateau(rows, cols));
replayButton.addEventListener("click", () => viderPlateau(rows, cols));