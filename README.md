# FR

## Puissance 4

### Introduction

Le projet Puissance 4 est une implémentation en JavaScript du célèbre jeu de stratégie « Puissance 4 ». Il a été conçu pour être utilisé dans un environnement web et offre des fonctionnalités telles que la simulation de parties, des tests unitaires et une interface utilisateur interactive.

### Architecture

#### 1. Variables (`variables.js`)

Le fichier `variables.js` contient les variables globales utilisées dans le projet.

#### 2. Plateau (`board.js`)

Le fichier `board.js` contient les fonctions liées à la gestion du plateau de jeu. Les principales fonctionnalités comprennent :

* `initializeBoard(rows_param, cols_param, simulate_param)` : Initialise le plateau de jeu avec un nombre spécifié de lignes et de colonnes.
* `createCell(row_param, col_param)` : Crée un élément de cellule HTML avec les coordonnées spécifiées.
* `viderPlateau(rows_param, cols_param)` : Vide le plateau de jeu avec une animation.
* `resetBoard(rows_param, cols_param, simulate_param)` : Réinitialise le plateau de jeu avec les paramètres spécifiés.
* `isBoardFull(rows_param, cols_param)` : Vérifie si le plateau est entièrement rempli.
* `getAvailableRow(col_param, rows_param)` : Retourne la première ligne disponible dans une colonne donnée.

#### 3. Jeu (`game.js`)

Le fichier `game.js` contient les fonctions liées à la gestion du jeu. Les principales fonctionnalités :

* `checkWin(player_param, row_param, col_param)` : Vérifie les conditions de victoire et met à jour le message de victoire.
* `isHorizontalWin(player_param, row_param)` : Vérifie la condition de victoire horizontale.
* `isVerticalWin(player_param, col_param)` : Vérifie la condition de victoire verticale.
* `isDiagonalWin(player_param, row_param, col_param)` : Vérifie la condition de victoire diagonale.
* `checkDiagonalSegment(...)` : Vérifie la direction de la diagonale gagnante.
* `isInBounds(row_param, col_param)` : Vérifie si les coordonnées sont dans les limites.
* `getWinningCells(...)`, `getHorizontalSegment(...)`, `getDiagonalSegment(...)`, `getCell(...)` : Gèrent les cellules gagnantes.
* `showReplayButton()` : Affiche le bouton de rejouer.

#### 4. Jetons (`token.js`)

Gère l’animation des jetons lorsqu’ils sont placés sur le plateau :

* `placeToken(col_param, simulate_param)` : Place un jeton dans la colonne avec animation.
* `applyBlinkAnimation(winningCells_param)` : Anime les cellules gagnantes.
* `removeBlinkAnimation()` : Supprime l’animation.

#### 5. Joueurs (`player.js`)

Gère le tour des joueurs :

* `switchPlayer(player_param, simulate_param)` : Passe au joueur suivant.
* `blinkPlayerTurn(player_param)` : Fait clignoter le joueur actif.

#### 6. Simulation (`simulate.js`)

Permet de simuler différentes conditions de victoire et situations :

* `simulateHorizontalWin()`, `simulateVerticalWin()`, `simulateDiagonalWin()` : Simulent différentes victoires.
* `simulateFullBoard()` : Simule un plateau plein.
* `launchSimulation()` : Initialise une simulation.
* `simulatePlaceToken(col_param)` : Simule le placement d’un jeton.

### Tests Unitaires

Le projet utilise `QUnit` pour tester :

* L’initialisation et la réinitialisation du plateau.
* La condition de plateau plein.
* La recherche de la première ligne disponible.
* Le changement de joueur et son clignotement.
* Les conditions de victoire.
* L’affichage du bouton rejouer.

### Interface Utilisateur

L’interface est conviviale et interactive, avec des animations et un thème sombre. Elle permet de jouer, simuler des victoires et recommencer une partie.

### Utilisation

1. **Initialisation du jeu** : Ouvrir `index.html` dans un navigateur, cliquer sur `Jouer`.
2. **Interactions** : Cliquer sur une colonne pour placer un jeton, observer animations et messages de victoire ou match nul.
3. **Rejouer / Vider le plateau** : Boutons pour recommencer ou vider le plateau.
4. **Simulation** : Utiliser les boutons de simulation pour tester différentes conditions.
5. **Tests Unitaires** : Ouvrir la page HTML des tests QUnit.

---

# EN

## Connect 4

### Introduction

The Connect 4 project is a JavaScript implementation of the popular strategy game “Connect 4.” It is designed for web environments and provides features such as game simulation, unit testing, and an interactive user interface.

### Architecture

#### 1. Variables (`variables.js`)

The `variables.js` file contains global variables used throughout the project.

#### 2. Board (`board.js`)

The `board.js` file contains functions for managing the game board. Main functionalities:

* `initializeBoard(rows_param, cols_param, simulate_param)`: Initializes the game board with a specified number of rows and columns.
* `createCell(row_param, col_param)`: Creates an HTML cell element with specified coordinates.
* `viderPlateau(rows_param, cols_param)`: Clears the board with an animation.
* `resetBoard(rows_param, cols_param, simulate_param)`: Resets the board with specified parameters.
* `isBoardFull(rows_param, cols_param)`: Checks if the board is completely full.
* `getAvailableRow(col_param, rows_param)`: Returns the first available row in a given column.

#### 3. Game (`game.js`)

Contains game management functions:

* `checkWin(player_param, row_param, col_param)`: Checks win conditions and updates win message.
* `isHorizontalWin(player_param, row_param)`: Checks horizontal win.
* `isVerticalWin(player_param, col_param)`: Checks vertical win.
* `isDiagonalWin(player_param, row_param, col_param)`: Checks diagonal win.
* `checkDiagonalSegment(...)`: Checks winning diagonal direction.
* `isInBounds(row_param, col_param)`: Checks if coordinates are in bounds.
* `getWinningCells(...)`, `getHorizontalSegment(...)`, `getDiagonalSegment(...)`, `getCell(...)`: Handle winning cells.
* `showReplayButton()`: Shows the replay button.

#### 4. Tokens (`token.js`)

Manages token placement animations:

* `placeToken(col_param, simulate_param)`: Places a token in a column with animation.
* `applyBlinkAnimation(winningCells_param)`: Animates winning cells.
* `removeBlinkAnimation()`: Removes animation.

#### 5. Players (`player.js`)

Manages player turns:

* `switchPlayer(player_param, simulate_param)`: Switches to the next player.
* `blinkPlayerTurn(player_param)`: Blinks the active player.

#### 6. Simulation (`simulate.js`)

Simulates different win conditions and scenarios:

* `simulateHorizontalWin()`, `simulateVerticalWin()`, `simulateDiagonalWin()`: Simulate wins.
* `simulateFullBoard()`: Simulates a full board.
* `launchSimulation()`: Initializes a simulation.
* `simulatePlaceToken(col_param)`: Simulates token placement.

### Unit Testing

Uses `QUnit` to test:

* Board initialization and reset.
* Full board condition.
* First available row.
* Player switch and blinking.
* Win conditions.
* Replay button display.

### User Interface

Interactive and user-friendly with animations and a dark theme. Allows playing, simulating wins, and restarting games.

### Usage

1. **Game Initialization**: Open `index.html` in a browser, click `Play`.
2. **Interactions**: Click a column to place a token, watch animations and win/draw messages.
3. **Replay / Clear Board**: Buttons to restart or clear the board.
4. **Simulation**: Use simulation buttons to test different scenarios.
5. **Unit Testing**: Open QUnit HTML test page.

Veux‑tu que je fasse ça ?
