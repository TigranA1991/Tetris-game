"use strict";

class Game {
  constructor() {
    this.inProgress = false;
  }

  makeGame() {
    this.inProgress = true;

    if (this.inProgress) {
      this.addNewTetrominoOnGameBoard();
      this.drawGameBoard();
    }

    const interval = setInterval(() => {
      const currentCoordinates = this.findCurrentTetrominoPiecesCoordinates();
      const canMove =
        this.checkTetrominoMoveDownPossibility(currentCoordinates);
      if (!canMove) {
        clearInterval(interval);
        currentCoordinates.forEach((coordinate) => {
          matrix_fake[coordinate[0]][coordinate[1]] = 2;
        });
        this.makeGame();
      } else {
        this.updateMatrixAfterMove(currentCoordinates);
      }
      if (document.getElementById("gameBoard") !== null) {
        document.getElementById("gameBoard").remove();
      }
      this.drawGameBoard();
    }, 500);
  }

  //Creating 2-dimensional MATRIX for drawing game board
  createMatrix() {
    this.MATRIX = Array.from(
      Array(this.MATRIX_Y_LENGTH),
      () => new Array(this.MATRIX_X_LENGTH)
    );
    this.MATRIX.forEach((row) => row.fill(0));
  }

  createBoardPieaceDiv(element, className) {
    element.setAttribute("class", className);
    document.querySelector(".game_board").appendChild(element);
  }

  //Draw game board in browser
  drawGameBoard() {
    const gameBoard = document.createElement("div");
    gameBoard.setAttribute("class", "game_board");
    gameBoard.setAttribute("id", "gameBoard");
    document.querySelector(".game_board-wrapper").appendChild(gameBoard);
    matrix_fake.forEach((row) => {
      row.forEach((rowItem) => {
        switch (rowItem) {
          case EMPTY:
            const emptyCell = document.createElement("div");
            this.createBoardPieaceDiv(emptyCell, "emptyCell");
            break;
          case TETRO:
            const tetroCell = document.createElement("div");
            this.createBoardPieaceDiv(tetroCell, "tetroCell");
            break;
          case DONE:
            const doneTetroCell = document.createElement("div");
            this.createBoardPieaceDiv(doneTetroCell, "doneTetroCell");
            break;
          default:
            break;
        }
      });
    });
  }

  //Generating random integer for index with specified quantity
  generateRandomIndex(numberOftetrominos) {
    return Math.floor(Math.random() * numberOftetrominos);
  }

  //Function for generating random tetromino kind name and executing it from SHAPES list
  generateRandomTetromino() {
    const randomIndex = this.generateRandomIndex(7);
    const randomtetrominoType = TETROMINO_TYPES[randomIndex];
    return SHAPES[randomtetrominoType];
  }

  //Drawing new tetromino on game board
  addNewTetrominoOnGameBoard() {
    const newGeneratedTetromino = this.generateRandomTetromino();
    newGeneratedTetromino.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((tetroPiece, pieceIndex) => {
        matrix_fake[rowIndex][4 + pieceIndex] = tetroPiece;
      });
    });
  }

  findCurrentTetrominoPiecesCoordinates() {
    const currentPiecesCoordinateProperties = [];
    for (let i = matrix_fake.length - 1; i >= 0; i--) {
      const row = matrix_fake[i];
      if (row.includes(1)) {
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell === 1) {
            currentPiecesCoordinateProperties.push([i, j]);
          }
        }
      }
    }

    return currentPiecesCoordinateProperties;
  }

  checkTetrominoMoveDownPossibility(currentCoordinates) {
    const movingPossibilities = currentCoordinates.map((coordinate, i) => {
      if (coordinate[0] + 1 > matrix_fake.length - 1) {
        return false;
      } else if (
        matrix_fake[coordinate[0] + 1][coordinate[1]] !== undefined &&
        matrix_fake[coordinate[0] + 1][coordinate[1]] !== 2
      ) {
        return true;
      } else {
        return false;
      }
    });

    const canMove = movingPossibilities.every((value) => value === true);

    return canMove;
  }

  // Updating MATRIX on next move
  updateMatrixAfterMove(currentCoordinates) {
    currentCoordinates.forEach((coordinate) => {
      matrix_fake[coordinate[0]][coordinate[1]] = 0;
      matrix_fake[coordinate[0] + 1][coordinate[1]] = 1;
    });
  }

  creatingGameBoard() {
    const updatedGameBoard = document.createElement("div");
    updatedGameBoard.setAttribute("id", "gameBoard");
    updatedGameBoard.setAttribute("class", "game_board");
    gameBoardWrapper.appendChild(updatedGameBoard);
  }

  // checkGameBoardUpdatingState() {
  //   if (document.getElementById("gameBoard") !== null) {
  //     document.getElementById("gameBoard").remove();
  //   }
  // }

  settingIntervalForTetrominoMoves(propsAfterMoving) {
    const interval = setInterval(() => {
      const currentTetrominoPiecesCoordinates =
        this.findCurrentTetrominoPiecesCoordinates();
      const tetrominosMoveDownPossibilityProperties =
        this.checkTetrominoMoveDownPossibility(
          currentTetrominoPiecesCoordinates
        );
      this.updateMatrixAfterMove(propsAfterMoving);
      this.drawGameBoard();
    }, 1000);
  }

  // updating game board after move
  updateGameBoardAfterMove() {
    this.checkGameBoardUpdatingState();
    this.updateMatrixAfterMove();
    this.settingIntervalForTetrominoMoves();
    this.drawGameBoard();
  }

  tetrominoInGame() {}
}
