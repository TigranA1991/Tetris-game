'use strict';

const mainBoard = document.querySelector('.main_board');
const startGameBtn = document.querySelector('.startGame_btn');

const tetrominoKinds = ["I", "O", "T", "S", "Z", "J", "L"];

const matrix_fake = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let tetrominos = {
    "I": [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    "O": [
        [1, 1],
        [1, 1],
    ],
    "T": [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    "S": [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    "Z": [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    "J": [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    "L": [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ]
}

class GameBoard {
    constructor(matrix_fake){
        this.matrix = [];
        this.matrixXLength = 10;
        this.matrixYLength = 20;
        this.gameBoard = document.querySelector('.game_board');
        this.matrix_fake = matrix_fake;
    }

    //Creating 2-dimensional matrix for drawing game board
    createMatrix(){
        this.matrix = Array.from(Array(this.matrixYLength), () => new Array(this.matrixXLength));
        this.matrix.forEach(row => {
            return row.fill(0);
        })
    }

    //Draw game board in browser
    drawGameBoard(){
        this.matrix_fake.forEach(row => {
            row.forEach(rowItem => {
                if(rowItem === 0){
                    const emptyCell = document.createElement('div');
                    emptyCell.setAttribute('class', 'emptyCell');
                    this.gameBoard.appendChild(emptyCell);
                }else if(rowItem === 1){
                    const tetroCell = document.createElement('div');
                    tetroCell.setAttribute('class', 'tetroCell');
                    this.gameBoard.appendChild(tetroCell);
                }
            })
        })
    }

    //Generating random integer for index with specified quantity
    generateRandomIndex(numberOftetrominos){
        return Math.floor(Math.random() * numberOftetrominos);
    }

    //Function for generating random tetromino kind name and executing it from tetrominos list
    generateRandomTetromino(){
        let randomIndex = this.generateRandomIndex(7);
        let randomTetrominoKind = tetrominoKinds[randomIndex];
        return tetrominos[randomTetrominoKind];
    }

    drawNewTetrominoOnGameBoard(){
        debugger
        const newGeneratedTetromino = this.generateRandomTetromino();
        for(let i = 0; i < newGeneratedTetromino.length; i++){
            for(let j = 0; j < newGeneratedTetromino[i].length; j++){
                this.matrix_fake[i][4 + j] = newGeneratedTetromino[i][j];
            }
        }
    }

    updateGameBoard(){}
}

//Start game commands execution
startGameBtn.addEventListener('click', () => {
    console.log("Yayyy")
    startGameBtn.classList.toggle("hidden");
    mainBoard.classList.toggle('remove_blur');
    todo.createMatrix();
    todo.drawNewTetrominoOnGameBoard();
    todo.drawGameBoard();
})

const todo = new GameBoard(matrix_fake);
todo.generateRandomTetromino();