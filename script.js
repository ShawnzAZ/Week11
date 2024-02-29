// Coding Steps:
//      Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
//          * Create a Tic-Tac-Toe game grid using your HTML element of choice.
//          * When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
//          * A heading should say whether it is X's or O's turn and change with each move made.
//          * A button should be available to clear the grid and restart the game.
//          * When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar
//              Bootstrap component should appear across the screen announcing the winner.




const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
message.textContent = `${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
    endGame(false);
    } else if (isDraw()) {
    endGame(true);
    } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return winningConditions.some(combination => {
    return combination.every(index => {
        return cells[index].textContent === player;
    });
    });
}

function isDraw() {
    return [...cells].every(cell => {
    return cell.textContent !== '';
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        message.textContent = 'It\'s a draw!';
    } else {
        message.textContent = `${currentPlayer} wins!`;
// Figuring out bootstrap alert for winner
        var alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-primary';
        alertDiv.textContent = `${currentPlayer} wins!`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
