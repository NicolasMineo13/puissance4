const gameBoard = document.getElementById("game-board");
const rows = 6;
const cols = 7;
let currentPlayer = 1;
let boardState = [];

const createCell = (row, col) => {
	const cell = document.createElement("div");
	cell.classList.add("cell");
	cell.dataset.row = row;
	cell.dataset.col = col;
	cell.addEventListener("click", () => handleMove(col)); // Appel à handleMove
	return cell;
};

const initializeBoard = () => {
	currentPlayer = 1;

	for (let i = 0; i < rows; i++) {
		boardState.push(Array(cols).fill(0));
		for (let j = 0; j < cols; j++) {
			const cell = createCell(i, j);
			gameBoard.appendChild(cell);
		}
	}

	// Wait for the DOM to fully load
	document.addEventListener("DOMContentLoaded", () => {
		// Display the initial player's turn
		const player1Turn = document.getElementById("player1-turn");
		const player2Turn = document.getElementById("player2-turn");
		const replayButton = document.getElementById("replay-button");

		if (currentPlayer === 1) {
			player1Turn.classList.remove("visibilityhidden");
			player2Turn.classList.add("visibilityhidden");
		} else {
			player1Turn.classList.add("visibilityhidden");
			player2Turn.classList.remove("visibilityhidden");
		}

		replayButton.addEventListener("click", resetBoard);
	});
};

const resetBoard = () => {
	// Reset the boardState and remove discs from the display
	const replayButton = document.getElementById("replay-button");
	const player1Turn = document.getElementById("player1-turn");
	const player2Turn = document.getElementById("player2-turn");
	gameWon = false;
	boardState = [];
	gameBoard.innerHTML = ""; // Clear the game board
	replayButton.classList.add("displaynone");
	player1Turn.innerHTML = "À votre tour";
	player2Turn.innerHTML = "À votre tour";
	initializeBoard(); // Initialize a new game board
};

const checkWin = (player) => {
	return (
		checkHorizontalWin(player) ||
		checkVerticalWin(player) ||
		checkDiagonalWin(player)
	);
};

let gameWon = false; // Variable to track if the game has been won

const handleMove = (col) => {
	// Check if the game has been won
	if (gameWon) {
		// console.log('Game has already been won. Click "Replay" to start a new game.');
		return;
	}

	const row = getAvailableRow(col);

	if (row === -1) {
		// console.log('Column is full. Please choose another column.');
		return;
	}

	const cell = document.querySelector(
		`[data-row='${row}'][data-col='${col}']`
	);
	cell.classList.add(`player${currentPlayer}`);

	// Update the board state
	boardState[row][col] = currentPlayer;

	// Check for a win after placing a piece
	if (checkWin(currentPlayer, row, col)) {
		gameWon = true; // Set the game as won

		const player1Turn = document.getElementById("player1-turn");
		const player2Turn = document.getElementById("player2-turn");
		player1Turn.classList.add("visibilityhidden");
		player2Turn.classList.add("visibilityhidden");

		if (currentPlayer == 1) {
			player1Turn.classList.remove("visibilityhidden");
			player1Turn.innerHTML = `Le Joueur ${currentPlayer} a gagné!`;
		} else {
			player2Turn.classList.remove("visibilityhidden");
			player2Turn.innerHTML = `Le Joueur ${currentPlayer} a gagné!`;
		}

		showReplayButton(); // Show the replay button
		return;
	}

	if (isBoardFull()) {
		showReplayButton(); // Show the replay button
		return;
	}

	// Switch to the other player
	currentPlayer = currentPlayer === 1 ? 2 : 1;

	// Toggle the display and animation of turn indicators
	const player1Turn = document.getElementById("player1-turn");
	const player2Turn = document.getElementById("player2-turn");

	if (currentPlayer === 1) {
		player1Turn.classList.remove("visibilityhidden");
		player2Turn.classList.add("visibilityhidden");
	} else {
		player1Turn.classList.add("visibilityhidden");
		player2Turn.classList.remove("visibilityhidden");
	}
};

const isBoardFull = () => {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (boardState[i][j] === 0) {
				return false;
			}
		}
	}
	return true;
};

const showReplayButton = () => {
	const replayButton = document.getElementById("replay-button");
	replayButton.classList.remove("displaynone");
};

const getAvailableRow = (col) => {
	for (let i = rows - 1; i >= 0; i--) {
		if (boardState[i][col] === 0) {
			return i;
		}
	}
	return -1; // Column is full
};

const checkHorizontalWin = (player) => {
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col <= cols - 4; col++) {
			if (
				boardState[row][col] === player &&
				boardState[row][col + 1] === player &&
				boardState[row][col + 2] === player &&
				boardState[row][col + 3] === player
			) {
				return true;
			}
		}
	}
	return false;
};

const checkVerticalWin = (player) => {
	for (let col = 0; col < cols; col++) {
		for (let row = 0; row <= rows - 4; row++) {
			if (
				boardState[row][col] === player &&
				boardState[row + 1][col] === player &&
				boardState[row + 2][col] === player &&
				boardState[row + 3][col] === player
			) {
				return true;
			}
		}
	}
	return false;
};

const checkDiagonalWin = (player) => {
	for (let row = 0; row <= rows - 4; row++) {
		for (let col = 0; col <= cols - 4; col++) {
			// Check diagonal from top-left to bottom-right
			if (
				boardState[row][col] === player &&
				boardState[row + 1][col + 1] === player &&
				boardState[row + 2][col + 2] === player &&
				boardState[row + 3][col + 3] === player
			) {
				return true;
			}

			// Check diagonal from bottom-left to top-right
			if (
				boardState[row + 3][col] === player &&
				boardState[row + 2][col + 1] === player &&
				boardState[row + 1][col + 2] === player &&
				boardState[row][col + 3] === player
			) {
				return true;
			}
		}
	}
	return false;
};

initializeBoard();
