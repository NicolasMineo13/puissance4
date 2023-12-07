# Documentation du Projet Connect 4

## Introduction

Le projet Connect 4 est une implémentation en JavaScript du célèbre jeu de stratégie « Puissance 4 ». Il a été conçu pour être utilisé dans un environnement web et offre des fonctionnalités telles que la simulation de parties, des tests unitaires et une interface utilisateur interactive.

## Architecture

### 1. **Board Module (`board.js`)**

Le module `board.js` contient les fonctions liées à la gestion du plateau de jeu. Les principales fonctionnalités comprennent l'initialisation du plateau, le placement des jetons, la vérification des conditions de victoire et la gestion des animations.

- `initializeBoard(rows, cols)`: Initialise le plateau de jeu avec un nombre spécifié de lignes et de colonnes.
- `createCell(row, col)`: Crée un élément de cellule HTML avec les coordonnées spécifiées.
- `resetBoard(rows, cols)`: Réinitialise le plateau de jeu avec les paramètres spécifiés.
- `isBoardFull(rows, cols)`: Vérifie si le plateau de jeu est entièrement rempli.
- `getAvailableRow(col, rows)`: Retourne la première ligne disponible dans une colonne donnée.
- `checkWin(player, row, col)`: Vérifie si le joueur actuel a remporté la partie.
- `showReplayButton()`: Affiche le bouton de rejouer et active la possibilité de pointer vers le plateau.

### 2. **Token Module (`token.js`)**

Le module `token.js` gère l'animation des jetons lorsqu'ils sont placés sur le plateau.

- `placeToken(col, simulate)`: Place un jeton dans la colonne spécifiée avec une animation en option.
- `applyBlinkAnimation(winningCells)`: Applique une animation de clignotement aux cellules gagnantes.
- `removeBlinkAnimation()`: Supprime l'animation de clignotement des cellules.

### 3. **Player Module (`player.js`)**

Le module `player.js` est responsable de la gestion des tours des joueurs.

- `blinkPlayerTurn(player)`: Fait clignoter le tour du joueur actuel.

### 4. **Simulation Module (`simulate.js`)**

Le module `simulate.js` permet la simulation de différentes conditions de victoire et de situations de jeu.

- `simulateHorizontalWin()`: Simule une victoire horizontale.
- `simulateVerticalWin()`: Simule une victoire verticale.
- `simulateDiagonalWin()`: Simule une victoire diagonale.
- `simulateFullBoard()`: Simule un plateau de jeu entièrement rempli.
- `launchSimulation()`: Initialise une simulation en réinitialisant le plateau.

## Tests Unitaires

Le projet intègre des tests unitaires à l'aide de QUnit pour garantir le bon fonctionnement des différentes fonctions.

- Tests pour l'initialisation du plateau, la création de cellules et la réinitialisation.
- Tests pour vérifier la condition de plateau plein.
- Tests pour la recherche de la première ligne disponible dans une colonne.
- Tests pour les différentes conditions de victoire.

## Interface Utilisateur

L'interface utilisateur est conçue pour être conviviale et interactive. Elle offre la possibilité de jouer, de simuler des scénarios de victoire, et de rejouer une partie.

## Utilisation

1. **Initialisation du Jeu**:

   - Inclure les fichiers JavaScript dans votre page HTML.
   - Appeler la fonction `initializeBoard(rows, cols)` pour initialiser le jeu.
2. **Interaction Utilisateur**:

   - Placer un jeton en cliquant sur une colonne.
   - Observer les animations et les messages de victoire ou de match nul.
3. **Simulation (Optionnel)**:

   - Utiliser les boutons de simulation pour tester différentes conditions de jeu.
4. **Tests Unitaires (Optionnel)**:

   - Ouvrir la page HTML des tests QUnit pour vérifier la conformité des fonctions.