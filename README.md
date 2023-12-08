# Documentation du Projet Puissance 4

## Introduction

Le projet Puissance 4 est une implémentation en JavaScript du célèbre jeu de stratégie « Puissance 4 ». Il a été conçu pour être utilisé dans un environnement web et offre des fonctionnalités telles que la simulation de parties, des tests unitaires et une interface utilisateur interactive.

## Architecture

### 1. **Variables (`variables.js`)**

Le fichier `variables.js` contient les variables globales utilisées dans le projet.

### 2. **Plateau (`board.js`)**

Le fichier `board.js` contient les fonctions liées à la gestion du plateau de jeu. Les principales fonctionnalités comprennent l'initialisation du plateau, la création de cellules, la réinitialisation du plateau, la vérification de la condition de plateau plein et la recherche de la première ligne disponible dans une colonne.

- `initializeBoard(rows_param, cols_param, simulate_param)`: Initialise le plateau de jeu avec un nombre spécifié de lignes et de colonnes.
- `createCell(row_param, col_param)`: Crée un élément de cellule HTML avec les coordonnées spécifiées.
- `viderPlateau(rows_param, cols_param)`: Vide le plateau de jeu avec une animation.
- `resetBoard(rows_param, cols_param, simulate_param)`: Réinitialise le plateau de jeu avec les paramètres spécifiés.
- `isBoardFull(rows_param, cols_param)`: Vérifie si le plateau de jeu est entièrement rempli.
- `getAvailableRow(col_param, rows_param)`: Retourne la première ligne disponible dans une colonne donnée.

### 3. **Jeu (`game.js`)**

Le fichier `game.js` contient les fonctions liées à la gestion du jeu. Les principales fonctionnalités comprennent la gestion des tours des joueurs, la vérification des conditions de victoire et la gestion des messages de victoire ou de match nul.

- `checkWin(player_param, row_param, col_param)`: Vérifie les conditions de victoire, renvoie le résultat et met à jour le message de victoire.
- `isHorizontalWin(player_param, row_param)`: Vérifie la condition de victoire à l'horizontale.
- `isVerticalWin(player_param, col_param)`: Vérifie la condition de victoire à la verticale.
- `isDiagonalWin(player_param, row_param, col_param)`: Vérifie la condition de victoire en diagonale.
- `checkDiagonalSegment(player_param, row_param, col_param, rowDirection_param, colDirection_param)`: Vérifie quelle est la direction de la diagonale gagnante.
- `isInBounds(row_param, col_param)`: Vérifie si les coordonnées spécifiées sont dans les limites du plateau de jeu.
- `getWinningCells(row_param, col_param, type_param)`: Retourne les cellules gagnantes pour une direction donnée.
- `getHorizontalSegment(row_param, col_param, colDirection_param)`: Retourne les cellules gagnantes pour une direction horizontale donnée.
- `getDiagonalSegment(row_param, col_param, rowDirection_param, colDirection_param)`: Retourne les cellules gagnantes pour une direction diagonale donnée.
- `getCell(row_param, col_param)`: Retourne la cellule spécifiée.
- `showReplayButton()`: Affiche le bouton de rejouer.

### 4. **Jetons (`token.js`)**

Le fichier `token.js` gère l'animation des jetons lorsqu'ils sont placés sur le plateau.

- `placeToken(col_param, simulate_param)`: Place un jeton dans la colonne spécifiée avec une animation.
- `applyBlinkAnimation(winningCells_param)`: Applique une animation de clignotement aux cellules gagnantes.
- `removeBlinkAnimation()`: Supprime l'animation de clignotement des cellules.

### 5. **Joueurs (`player.js`)**

Le ficier `player.js` gère le tour des joueurs.

- `switchPlayer(player_param, simulate_param)`: Passe au joueur suivant.
- `blinkPlayerTurn(player_param)`: Fait clignoter le joueur qui doit jouer et fait déclignoter l'autre.

### 6. **Simulation (`simulate.js`)**

Le fichier `simulate.js` permet la simulation de différentes conditions de victoire et de situations de jeu.

- `simulateHorizontalWin()`: Simule une victoire horizontale.
- `simulateVerticalWin()`: Simule une victoire verticale.
- `simulateDiagonalWin()`: Simule une victoire diagonale.
- `simulateFullBoard()`: Simule un plateau de jeu entièrement rempli.
- `launchSimulation()`: Initialise une simulation en réinitialisant le plateau.
- `simulatePlaceToken(col_param)`: Simule le placement d'un jeton dans la colonne spécifiée.

## Tests Unitaires

Le projet intègre des tests unitaires à l'aide de `QUnit` pour garantir le bon fonctionnement des différentes fonctions essentielles.

- Tests pour l'initialisation du plateau, la création de cellules et la réinitialisation.
- Tests pour vérifier la condition de plateau plein.
- Tests pour la recherche de la première ligne disponible dans une colonne.
- Tests pour le changement de joueur et son clignotement.
- Tests pour les différentes conditions de victoire.
- Tests pour l'affichage du bouton rejouer.

## Interface Utilisateur

L'interface utilisateur est conçue pour être conviviale et interactive. Elle offre la possibilité de jouer, de simuler des scénarios de victoire, et de refaire une partie tout ça avec de belles animations et un thème sombre et élégant.

## Utilisation

1. **Initialisation du Jeu**:
   - Ouvrir le fichier `index.html` du dossier `html` dans un navigateur web.
   - Cliquer sur le bouton `Jouer` pour commencer la partie.
2. **Interactions Utilisateur**:
   - Placer un jeton en cliquant sur une colonne.
   - Observer les animations.
   - Observer les messages de victoire ou de match nul.
   - Cliquer sur le bouton `Rejouer` pour recommencer une partie.
   - Cliquer sur le bouton `Vider le plateau` pour vider le plateau.
3. **Simulation (Optionnel)**:
   - Utiliser les boutons de simulation pour tester différentes conditions de jeu.
4. **Tests Unitaires (Optionnel)**:
   - Ouvrir la page HTML des tests QUnit pour vérifier la conformité des fonctions.
