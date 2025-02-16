const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const turnIndicator = document.querySelector('.turn-indicator');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const handleClick = (event) => {
    const index = event.target.dataset.index;

    if (gameState[index] !== "" || !isGameActive) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
};

const checkWinner = () => {
    let roundWon = false;

    for (let pattern of winningPatterns) {
        let [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            break;
        }
    }

    if (roundWon) {
        turnIndicator.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        turnIndicator.textContent = "It's a Draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    turnIndicator.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winning-cell');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
