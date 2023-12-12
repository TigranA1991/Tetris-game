const matrixXLength = 10;
const matrixYLength = 20;
const mainBoard = document.querySelector('.main_board');
const startGameBtn = document.querySelector('.startGame_btn');

class GameBoard {
    constructor(matrixXLength, matrixYLength){
        this.matrix = [];
        this.matrixXLength = matrixXLength;
        this.matrixYLength = matrixYLength;
        this.gameBoard = document.querySelector('.game_board');
    }

    createMatrix(){
        this.matrix = Array.from(Array(this.matrixYLength), () => new Array(this.matrixXLength));
        this.matrix.forEach(item => {
            return item.fill(0);
        })
        
    }

    createGameBoard(){
        this.matrix.forEach(row => {
            row.forEach(rowItem => {
                if(rowItem === 0){
                    const cell = document.createElement('div');
                    cell.setAttribute('class', 'cell');
                    console.log(cell);
                    console.log("This is work");
                    this.gameBoard.appendChild(cell);
                }
            })
        })
        console.log(this.gameBoard);
    }
}

startGameBtn.addEventListener('click', () => {
    console.log("Yayyy")
    startGameBtn.classList.toggle("hidden");
    mainBoard.classList.toggle('remove_blur');
})

const todo = new GameBoard(matrixXLength, matrixYLength);
todo.createMatrix();
todo.createGameBoard();