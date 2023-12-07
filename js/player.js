function swapPlayerTurn(player_param, simulate_param = false) {
    currentPlayer = player_param === 1 ? 2 : 1;
    if (!simulate_param)
        blinkPlayerTurn(currentPlayer);
}

function blinkPlayerTurn(player_param) {
    if (player_param === 1) {
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
}