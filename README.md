# 🔴🟡 Puissance 4 — Connect Four Web

> Implémentation web du jeu **Puissance 4** en **JavaScript Vanilla**, avec interface interactive, animations CSS, mode simulation et suite de tests unitaires **QUnit** intégrée.

---

## 📋 Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Architecture JavaScript](#architecture-javascript)
- [Démarrage](#démarrage)
- [Règles du jeu](#règles-du-jeu)
- [Mode Simulation](#mode-simulation)
- [Tests unitaires (QUnit)](#tests-unitaires-qunit)
- [Variables globales](#variables-globales)

---

## Aperçu du projet

Puissance 4 est un jeu à deux joueurs qui s'affrontent en plaçant des jetons colorés (jaune / rouge) dans une grille **6 lignes × 7 colonnes**. Le premier joueur à aligner 4 jetons consécutifs — horizontalement, verticalement ou en diagonale — remporte la partie.

Ce projet est une implémentation **100% front-end**, sans framework ni build tool : HTML, CSS et JavaScript purs, avec Bootstrap pour la mise en page et QUnit pour les tests. Il suffit d'ouvrir `html/game.html` dans un navigateur pour jouer.

---

## Fonctionnalités

- ✅ **Jeu en local à 2 joueurs** — Joueur 1 (🟡 jaune) vs Joueur 2 (🔴 rouge)
- ✅ **Grille dynamique** — dimensions configurables via `initializeBoard(rows, cols)`
- ✅ **Détection de victoire** : horizontale, verticale, diagonale (4 directions)
- ✅ **Détection du match nul** — plateau complet sans vainqueur
- ✅ **Animation des jetons** qui tombent dans la colonne
- ✅ **Animation des cellules gagnantes** (clignotement)
- ✅ **Indicateur de tour** — le panneau du joueur actif clignote
- ✅ **Message de victoire** affiché en overlay
- ✅ **Bouton Rejouer** et **Vider le plateau** avec animation
- ✅ **Mode Simulation** — 4 scénarios préchargés pour tester les conditions de jeu
- ✅ **Tests unitaires** QUnit accessibles directement depuis l'interface
- ✅ **Thème sombre** — interface en dark mode

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| HTML5 | — | Structure des pages |
| CSS3 | — | Styles, animations, CSS Custom Properties |
| JavaScript | ES6+ | Logique de jeu (vanilla, sans framework) |
| Bootstrap | inclus localement | Mise en page (`bootstrap/`) |
| QUnit | inclus localement | Framework de tests unitaires (`qunit/`) |

Aucune dépendance externe, aucun serveur requis. Bootstrap et QUnit sont embarqués dans le projet.

---

## Structure du projet

```
puissance4/
│
├── html/
│   ├── index.html          # Page d'accueil — écran de démarrage
│   ├── game.html           # Page de jeu principale
│   └── tests.html          # Page des tests unitaires QUnit
│
├── js/
│   ├── variables.js        # Variables globales partagées entre tous les modules
│   ├── board.js            # Gestion du plateau (initialisation, reset, état)
│   ├── game.js             # Logique de victoire (horizontal, vertical, diagonal)
│   ├── token.js            # Placement et animation des jetons
│   ├── player.js           # Gestion des tours joueurs
│   ├── simulate.js         # Mode simulation (victoires préprogrammées)
│   ├── main.js             # Point d'entrée — init + event listeners
│   └── tests.js            # Suite de tests QUnit
│
├── css/
│   └── style.css           # Styles personnalisés (dark theme, animations, grille)
│
├── img/
│   ├── yellow_player.png   # Avatar Joueur 1
│   └── red_player.png      # Avatar Joueur 2
│
├── bootstrap/              # Bootstrap CSS embarqué localement
│   └── css/
│       └── bootstrap.min.css
│
└── qunit/                  # QUnit embarqué localement
    ├── css/
    └── js/
```

---

## Architecture JavaScript

Le projet adopte une **architecture modulaire à fichiers séparés** : chaque fichier JS encapsule une responsabilité précise. Tous les scripts sont chargés séquentiellement dans `game.html`, ce qui leur donne accès aux variables globales définies dans `variables.js`.

```
variables.js   ← état global partagé
    │
    ├── board.js      ← plateau (DOM + boardState[])
    ├── game.js       ← logique de victoire
    ├── token.js      ← animation jetons
    ├── player.js     ← gestion des tours
    ├── simulate.js   ← scénarios de simulation
    └── main.js       ← initialisation + event listeners
```

### `variables.js` — État global

Centralise toutes les variables partagées entre les modules :

| Variable | Type | Description |
|---|---|---|
| `gameBoard` | HTMLElement | Référence à l'élément DOM du plateau |
| `rows`, `cols` | number | Dimensions du plateau |
| `currentPlayer` | number | Joueur actif (1 ou 2) |
| `boardState` | number[][] | Matrice représentant l'état de chaque cellule (0 = vide, 1 = J1, 2 = J2) |
| `gameWon` | boolean | Indique si la partie est terminée |
| `simulationInProgress` | boolean | Bloque les interactions pendant une simulation |
| `animationInProgress` | boolean | Bloque les clics pendant une animation |
| `timing` | number | Délai cumulatif pour les animations séquentielles |
| `timingIncrement` | number | Incrément de délai entre chaque jeton animé (150ms) |
| `direction` | number | Direction de la diagonale gagnante |

### `board.js` — Plateau de jeu

| Fonction | Description |
|---|---|
| `initializeBoard(rows, cols, simulate?)` | Crée la grille DOM et initialise `boardState` |
| `createCell(row, col)` | Génère un élément `<div class="cell">` avec `data-row` et `data-col` |
| `viderPlateau(rows, cols)` | Vide le plateau avec animation, puis appelle `resetBoard` |
| `resetBoard(rows, cols, simulate?)` | Réinitialise l'état du jeu (board, joueur, messages) |
| `isBoardFull(rows, cols)` | Retourne `true` si toutes les cellules sont occupées |
| `getAvailableRow(col, rows)` | Retourne la ligne disponible la plus basse dans une colonne (`-1` si pleine) |

### `game.js` — Logique de victoire

| Fonction | Description |
|---|---|
| `checkWin(player, row, col)` | Vérifie toutes les conditions de victoire et retourne `{type, cells}` |
| `isHorizontalWin(player, row)` | Détecte une victoire horizontale |
| `isVerticalWin(player, col)` | Détecte une victoire verticale |
| `isDiagonalWin(player, row, col)` | Détecte une victoire diagonale (↗ et ↘) |
| `checkDiagonalSegment(...)` | Vérifie un segment diagonal dans une direction donnée |
| `isInBounds(row, col)` | Vérifie que les coordonnées sont dans les limites de la grille |
| `getWinningCells(...)` | Retourne les 4 cellules DOM formant l'alignement gagnant |
| `getHorizontalSegment(...)` | Extrait les cellules d'un segment horizontal |
| `getDiagonalSegment(...)` | Extrait les cellules d'un segment diagonal |
| `getCell(row, col)` | Retourne la cellule DOM à la position `(row, col)` |
| `showReplayButton()` | Affiche le bouton rejouer et réactive le plateau |

### `token.js` — Jetons & animations

| Fonction | Description |
|---|---|
| `placeToken(col, simulate?)` | Place un jeton dans la colonne avec animation de chute |
| `applyBlinkAnimation(winningCells)` | Fait clignoter les 4 cellules gagnantes |
| `removeBlinkAnimation()` | Supprime l'animation de clignotement |

### `player.js` — Tours joueurs

| Fonction | Description |
|---|---|
| `switchPlayer(player, simulate?)` | Passe au joueur suivant et met à jour l'UI |
| `blinkPlayerTurn(player)` | Fait clignoter le panneau du joueur actif, masque l'autre |

### `simulate.js` — Mode simulation

| Fonction | Description |
|---|---|
| `simulateHorizontalWin()` | Simule une victoire horizontale (4 jetons en ligne) |
| `simulateVerticalWin()` | Simule une victoire verticale (4 jetons en colonne) |
| `simulateDiagonalWin()` | Simule une victoire diagonale |
| `simulateFullBoard()` | Simule un match nul (plateau plein) |
| `launchSimulation()` | Réinitialise l'état pour lancer une simulation |
| `simulatePlaceToken(col)` | Place un jeton en mode simulation (sans interaction joueur) |

### `main.js` — Point d'entrée

```javascript
initializeBoard(6, 7);  // Grille standard 6×7

buttonSimulateHorizontal.addEventListener("click", simulateHorizontalWin);
buttonSimulateVertical.addEventListener("click", simulateVerticalWin);
buttonSimulateDiagonal.addEventListener("click", simulateDiagonalWin);
buttonSimulateFullBoard.addEventListener("click", simulateFullBoard);
buttonReset.addEventListener("click", () => viderPlateau(rows, cols));
replayButton.addEventListener("click", () => viderPlateau(rows, cols));
```

---

## Démarrage

Aucun serveur, aucune installation requise.

```bash
git clone https://github.com/NicolasMineo13/puissance4.git
cd puissance4
```

Ouvrir directement dans un navigateur :

```
html/index.html   → Page d'accueil
html/game.html    → Jeu (accès direct possible)
html/tests.html   → Tests unitaires QUnit
```

> ⚠️ Certains navigateurs bloquent le chargement de fichiers JS locaux depuis `file://` (CORS). Si les scripts ne se chargent pas, lancez un serveur local minimal :
>
> ```bash
> # Python 3
> python -m http.server 8080
> # puis ouvrir http://localhost:8080/html/game.html
> ```

---

## Règles du jeu

1. Le **Joueur 1** (🟡 jaune) commence toujours.
2. Les joueurs jouent à tour de rôle en **cliquant sur une colonne** — le jeton tombe à la case la plus basse disponible.
3. Le premier joueur à aligner **4 jetons consécutifs** (horizontalement, verticalement ou en diagonale) gagne.
4. Si le plateau est plein sans alignement de 4, c'est un **match nul**.
5. Après une victoire ou un match nul, le bouton **Rejouer** apparaît pour relancer une partie.

---

## Mode Simulation

L'interface propose 5 boutons de simulation accessibles en bas de l'écran de jeu :

| Bouton | Scénario simulé |
|---|---|
| **Victoire horizontale** | 4 jetons alignés sur une ligne |
| **Victoire verticale** | 4 jetons alignés en colonne |
| **Victoire diagonale** | 4 jetons alignés en diagonale |
| **Match nul** | Plateau entièrement rempli sans vainqueur |
| **Vider le plateau** | Réinitialisation immédiate avec animation |

Les simulations s'animent automatiquement avec le même système de délais que le jeu réel (`timingIncrement = 150ms` par jeton).

---

## Tests unitaires (QUnit)

Ouvrir `html/tests.html` dans un navigateur pour exécuter les tests.

QUnit est embarqué localement dans `qunit/` — aucune connexion internet requise.

### Couverture des tests (`js/tests.js`)

| Test | Assertions vérifiées |
|---|---|
| `initializeBoard` | Dimensions CSS (`--rows`, `--cols`), taille de `boardState`, joueur initial, état `gameWon`, messages des joueurs, nombre de cellules DOM |
| `createCell` | Type HTMLElement, classe `cell`, attributs `data-row` et `data-col` |
| `resetBoard` | Visibilité du bouton rejouer, message de victoire vide, dimensions, `timing` remis à 0 |
| `isBoardFull` | Plateau non plein avec cases vides, plateau plein avec `boardState` rempli |
| `getAvailableRow` | Retourne la bonne ligne disponible, retourne `-1` si colonne pleine |
| `swapPlayerTurn` | Passage de joueur 1 → 2 → 1 |
| `blinkPlayerTurn` | Visibilité des labels et clignotement des panneaux pour J1 et J2 |
| `checkWin (horizontal)` | Détection type `"horizontal"`, 4 cellules gagnantes |
| `checkWin (vertical)` | Détection type `"vertical"`, 4 cellules gagnantes |
| `checkWin (diagonal)` | Détection type `"diagonal"`, 4 cellules gagnantes |
| `showReplayButton` | Visibilité du bouton, `simulationInProgress = false`, `pointerEvents = "auto"` |
