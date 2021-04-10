/*Tic Tac Toe*/

const x_class = "X";
const o_class = "O";

const winningGrids = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const squareElements = Array.from(document.querySelectorAll('#grid div'));
const grid = document.getElementById("grid");
const whoseTurn = document.querySelector('h2');
let gameOutcomeMessage = document.getElementById("result");
const resetButton = document.getElementById("reset");
let turn = "X"

// console.log(squareElements);

/*call function*/
gameStartUp();

function gameStartUp() { 
    
    squareElements.forEach(square => {
        /*reset grid*/
        square.classList.remove("X")
        square.classList.remove("O")
        square.removeEventListener("click", playGame)
        turn = "X"
        /*add event listener to allow for only one click*/
        square.addEventListener("click", playGame, { once: true })  
    });
    whoseTurn.textContent = "Player X make your move";
    setGridHoverClass();
}

function playGame(click) {
    /*clicked square*/
    const square = click.target
    /*whose turn is it currently*/
    let currentClass = turn === "X" ? "X" : "O";
    /*mark with currentClass value*/
    markSquare(square, currentClass)
    /*check to see if either X or O has won*/
    if (checkForWin(currentClass)) {
        // console.log('Winner')
        endGame(false)
        /*check to see if the grid is full and there is no winner*/ 
    }   else if (isDraw()) {
        // console.log("tie")
        endGame(true)
    }   else {
        /*swap turns*/
        turnCounter()
        /*change heading for current player turn~works*/
        whoseTurn.textContent = `Player ${turn} make your move`
        setGridHoverClass();
    }
    
}

/*works for alternating turns*/
function turnCounter() {
    if (turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    };
}

/* hover while selecting square with X or O*/
function setGridHoverClass() {
    grid.classList.remove(x_class)
    grid.classList.remove(o_class)
    if (turn == "X") {
        grid.classList.add(x_class)
    } else {
        grid.classList.add(o_class)
    };
}

/*mark selected square with X or O ~ works*/
function markSquare(square, currentClass) {
    square.classList.add(currentClass)
} 

/*checks for winner ~ works*/
function checkForWin(currentClass) {
    /*returns true if any combination is true*/
    return winningGrids.some(combination => {
        return combination.every(index => {
           return squareElements[index].classList.contains(currentClass)
        })
    })
}

/*checks for tie ~ works*/
function isDraw() {
    return squareElements.every(square => {
        return square.classList.contains(x_class) || square.classList.contains(o_class);
    });
}

/* outputs correct message for draw and X and O*/
function endGame(draw) {       
    if (draw) {
        gameOutcomeMessage.innerText = "Game is a Draw!"
    } else if (turn == "X") {
        gameOutcomeMessage.innerText = "Player X wins the game!" 
    } else if (turn == "O") {
        gameOutcomeMessage.innerText = "Player O wins the game!" 
    };
    $('#outcomeAnnouncer').modal('show');
}

/*clear grid ~ works*/
resetButton.addEventListener('click', gameStartUp);

