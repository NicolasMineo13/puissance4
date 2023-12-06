class Connect4Game {
	constructor(rows, cols) {
		this.gameBoard = document.getElementById("game-board");
		this.rows = rows;
		this.cols = cols;
		this.currentPlayer = null;
		this.boardState = [];
		this.gameWon = false;
		this.blinkInterval = null;

		// Initialize the board
		this.initializeBoard();
	}

	initializeBoard() {
		if (this.currentPlayer === null)
			this.currentPlayer = 2;

		for (let i = 0; i < this.rows; i++) {
			this.boardState.push(Array(this.cols).fill(0));
			for (let j = 0; j < this.cols; j++) {
				const cell = this.createCell(i, j);
				this.gameBoard.appendChild(cell);
			}
		}

		document.addEventListener("DOMContentLoaded", () => {
			// Display the initial player's turn
			const player1Turn = document.getElementById("player1-turn");
			const player2Turn = document.getElementById("player2-turn");
			const player1Panel = document.getElementById("player1-panel");
			const player2Panel = document.getElementById("player2-panel");
			const replayButton = document.getElementById("replay-button");

			if (this.currentPlayer === 1) {
				player1Turn.classList.remove("visibilityhidden");
				player2Turn.classList.add("visibilityhidden");
				player1Panel.classList.add("blink");
				player2Panel.classList.remove("blink");
			} else {
				player1Turn.classList.add("visibilityhidden");
				player2Turn.classList.remove("visibilityhidden");
				player1Panel.classList.remove("blink");
				player2Panel.classList.add("blink");
			}

			replayButton.addEventListener("click", () => this.resetBoard());
		});
	}

	createCell(row, col) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.dataset.row = row;
		cell.dataset.col = col;
		cell.addEventListener("click", () => this.handleMove(col));
		return cell;
	}

	resetBoard() {
		// Reset the boardState and remove discs from the display
		const replayButton = document.getElementById("replay-button");
		const player1Turn = document.getElementById("player1-turn");
		const player2Turn = document.getElementById("player2-turn");
		this.gameWon = false;
		this.boardState = [];
		this.gameBoard.innerHTML = "";
		replayButton.classList.add("visibilityhidden");
		player1Turn.innerHTML = "À votre tour";
		player2Turn.innerHTML = "À votre tour";
		this.removeBlinkAnimation(); // Remove blink class from all cells
		this.initializeBoard(); // Initialize a new game board
	}

	handleMove(col) {
		// Check if the game has been won
		if (this.gameWon) {
			return;
		}

		const row = this.getAvailableRow(col);

		if (row === -1) {
			return;
		}

		const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

		// Créez une nouvelle div pour la pièce
		const pieceDiv = document.createElement('div');
		pieceDiv.classList.add(`player${this.currentPlayer}-token`);
		pieceDiv.classList.add('falling-piece');

		// Ajoutez la nouvelle div à côté de la cellule principale
		cell.insertAdjacentElement('afterbegin', pieceDiv);

		// Ajoutez un gestionnaire d'événements pour l'événement 'animationend'
		pieceDiv.addEventListener('animationend', () => {
			// Retirez la classe falling-piece après l'animation
			pieceDiv.classList.remove('falling-piece');
			// Update the board state
			this.boardState[row][col] = this.currentPlayer;

			// Log the token placement
			console.log(`Placed a piece at row ${row}, col ${col}`);

			const winResult = this.checkWin(this.currentPlayer, row, col);

			if (winResult) {
				this.gameWon = true; // Set the game as won

				const player1Turn = document.getElementById("player1-turn");
				const player2Turn = document.getElementById("player2-turn");
				player1Turn.classList.add("visibilityhidden");
				player2Turn.classList.add("visibilityhidden");

				const player1Panel = document.getElementById("player1-panel");
				const player2Panel = document.getElementById("player2-panel");
				player1Panel.classList.remove("blink");
				player2Panel.classList.remove("blink");

				if (this.currentPlayer == 1) {
					player1Turn.classList.remove("visibilityhidden");
					player1Turn.innerHTML = `Le Joueur ${this.currentPlayer} a gagné !`;
				} else {
					player2Turn.classList.remove("visibilityhidden");
					player2Turn.innerHTML = `Le Joueur ${this.currentPlayer} a gagné !`;
				}

				this.applyBlinkAnimation(winResult.cells); // Show the replay button
				this.showReplayButton(); // Show the replay button
				return;
			}

			if (this.isBoardFull()) {
				this.showReplayButton(); // Show the replay button
				return;
			}

			// Switch to the other player
			this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

			// Toggle the display and animation of turn indicators
			const player1Turn = document.getElementById("player1-turn");
			const player2Turn = document.getElementById("player2-turn");
			const player1Panel = document.getElementById("player1-panel");
			const player2Panel = document.getElementById("player2-panel");

			if (this.currentPlayer === 1) {
				player1Turn.classList.remove("visibilityhidden");
				player2Turn.classList.add("visibilityhidden");
				player1Panel.classList.add("blink");
				player2Panel.classList.remove("blink");
			} else {
				player1Turn.classList.add("visibilityhidden");
				player2Turn.classList.remove("visibilityhidden");
				player1Panel.classList.remove("blink");
				player2Panel.classList.add("blink");
			}
		}, { once: true });

	}

	isBoardFull() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (this.boardState[i][j] === 0) {
					return false;
				}
			}
		}
		return true;
	}

	showReplayButton() {
		const replayButton = document.getElementById("replay-button");
		replayButton.classList.remove("visibilityhidden");
	}

	getAvailableRow(col) {
		for (let i = this.rows - 1; i >= 0; i--) {
			if (this.boardState[i][col] === 0) {
				return i;
			}
		}
		return -1; // Column is full
	}

	checkWin(player, row, col) {
		const horizontalWin = this.isHorizontalWin(player, row);
		const verticalWin = this.isVerticalWin(player, col);
		const diagonalWin = this.isDiagonalWin(player, row, col);

		if (horizontalWin) {
			return { type: 'horizontal', cells: this.getWinningCells(row, col, 'horizontal') };
		} else if (verticalWin) {
			return { type: 'vertical', cells: this.getWinningCells(row, col, 'vertical') };
		} else if (diagonalWin) {
			return { type: 'diagonal', cells: this.getWinningCells(row, col, 'diagonal') };
		}

		return false;
	}

	getWinningCells(row, col, type) {
		const winningCells = [];

		switch (type) {
			case 'horizontal':
				const winningSegmentLeft = this.getHorizontalSegment(row, col, -1);
				const winningSegmentRight = this.getHorizontalSegment(row, col, 1);

				if (winningSegmentLeft && winningSegmentLeft.every(cell => cell.classList.contains(`player${this.currentPlayer}-token`))) {
					winningCells.push(...winningSegmentLeft);
				}

				if (winningSegmentRight && winningSegmentRight.every(cell => cell.classList.contains(`player${this.currentPlayer}-token`))) {
					winningCells.push(...winningSegmentRight);
				}
				break;
			case 'vertical':
				for (let r = row; r < row + 4; r++) {
					winningCells.push(this.getCell(r, col));
				}
				break;
			case 'diagonal':
				for (let i = -1; i <= 1; i += 2) {
					const winningSegment = this.getDiagonalSegment(row, col, i, 1);
					if (winningSegment && winningSegment.every(cell => cell.classList.contains(`player${this.currentPlayer}-token`))) {
						winningCells.push(...winningSegment);
					}

					const otherWinningSegment = this.getDiagonalSegment(row, col, i, -1);
					if (otherWinningSegment && otherWinningSegment.every(cell => cell.classList.contains(`player${this.currentPlayer}-token`))) {
						winningCells.push(...otherWinningSegment);
					}
				}
				break;
			default:
				break;
		}

		console.log(winningCells);
		return winningCells;
	}

	getHorizontalSegment(row, col, colDirection) {
		const segment = [];

		for (let i = 0; i < 4; i++) {
			const currentCol = col + i * colDirection;
			if (!this.isInBounds(row, currentCol)) {
				return null;
			}
			segment.push(this.getCell(row, currentCol));
		}

		return segment;
	}

	getDiagonalSegment(row, col, rowDirection, colDirection) {
		const segment = [];

		for (let i = 0; i < 4; i++) {
			const currentRow = row + i * rowDirection;
			const currentCol = col + i * colDirection;
			if (!this.isInBounds(currentRow, currentCol)) {
				return null;
			}
			segment.push(this.getCell(currentRow, currentCol));
		}

		return segment;
	}

	applyBlinkAnimation(winningCells) {
		// Apply blink class to the winning tokens
		winningCells.forEach((cell) => {
			cell.classList.add("blink");
		});

		// Set a timeout to remove blink class after a duration
		setTimeout(() => {
			this.removeBlinkAnimation();
		}, 4000); // Adjust the duration as needed
	}

	getCell(row, col) {
		return document.querySelector(
			`[data-row='${row}'][data-col='${col}']`
		);
	}

	removeBlinkAnimation() {
		const winningCells = document.querySelectorAll(".winning-cell");
		winningCells.forEach((cell) => cell.classList.remove("winning-cell"));
	}

	isHorizontalWin(player, row) {
		for (let col = 0; col <= this.cols - 4; col++) {
			if (
				this.boardState[row][col] === player &&
				this.boardState[row][col + 1] === player &&
				this.boardState[row][col + 2] === player &&
				this.boardState[row][col + 3] === player
			) {
				return true;
			}
		}
		return false;
	}

	isVerticalWin(player, col) {
		for (let row = 0; row <= this.rows - 4; row++) {
			if (
				this.boardState[row][col] === player &&
				this.boardState[row + 1][col] === player &&
				this.boardState[row + 2][col] === player &&
				this.boardState[row + 3][col] === player
			) {
				return true;
			}
		}
		return false;
	}

	isDiagonalWin(player, row, col) {
		for (let i = -1; i <= 1; i += 2) {
			// Check diagonal from top-left to bottom-right
			if (
				this.checkDiagonalSegment(player, row, col, i, 1) ||
				// Check diagonal from bottom-left to top-right
				this.checkDiagonalSegment(player, row, col, i, -1)
			) {
				return true;
			}
		}
		return false;
	}

	checkDiagonalSegment(player, row, col, rowDirection, colDirection) {
		for (let i = 0; i < 4; i++) {
			const currentRow = row + i * rowDirection;
			const currentCol = col + i * colDirection;
			if (
				!this.isInBounds(currentRow, currentCol) ||
				this.boardState[currentRow][currentCol] !== player
			) {
				return false;
			}
		}
		return true;
	}

	isInBounds(row, col) {
		return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
	}
}

// Usage
const connect4Game = new Connect4Game(6, 7);
