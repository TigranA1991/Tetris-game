"use strict";

class Game {
  constructor() {
    this.inProgress = false;
    this.tetroMovingInProgress = false;
    this.currentTetromino = [];
    this.n = 1;
  }

  makeGame() {
    this.gameInProgress = true;

    if (this.gameInProgress) {
      this.addNewTetrominoToMatrix();
      this.renderGameBoard();
      this.movingInProgress = true;
      // this.renderGameBoard();

      if (this.movingInProgress) {
        this.n = 1;
        const interval = setInterval(() => this.makeMoveDown(interval), 1000);
      }
    }
  }

  addEventListener() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.moveToLeft();
          break;
        case "ArrowUp":
          this.rotate();
          break;
        case "ArrowRight":
          this.moveToRight();
        default:
          break;
      }
    });
  }

  //Creating 2-dimensional MATRIX for drawing game board
  createMatrix() {
    this.MATRIX = Array.from(
      Array(this.MATRIX_Y_LENGTH),
      () => new Array(this.MATRIX_X_LENGTH)
    );
    this.MATRIX.forEach((row) => row.fill(0));
  }

  createBoardPieaceElem(element, className) {
    element.setAttribute("class", className);
    document.querySelector(".game_board").appendChild(element);
  }

  createGameBoardElem() {
    if (document.getElementById("gameBoard") !== null) {
      document.getElementById("gameBoard").remove();
    }
    const gameBoard = document.createElement("div");
    gameBoard.setAttribute("class", "game_board");
    gameBoard.setAttribute("id", "gameBoard");
    document.querySelector(".game_board-wrapper").appendChild(gameBoard);
  }

  //Generating random integer for index with specified quantity
  generateRandomIndex(numberOfTetrominos) {
    return Math.floor(Math.random() * numberOfTetrominos);
  }

  //Function for generating random tetromino kind name and executing it from SHAPES list
  generateRandomTetromino() {
    const randomIndex = this.generateRandomIndex(7);
    const randomTetrominoType = TETROMINO_TYPES[randomIndex];
    return SHAPES[randomTetrominoType];
  }

  //Drawing new tetromino on game board
  addNewTetrominoToMatrix() {
    this.currentTetromino = this.generateRandomTetromino();
    this.currentTetromino.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((tetroPiece, pieceIndex) => {
        matrix_fake[rowIndex][4 + pieceIndex] = tetroPiece;
      });
    });
  }

  drawGameBoard() {
    matrix_fake.forEach((row) => {
      row.forEach((rowItem) => {
        switch (rowItem) {
          case EMPTY:
            const emptyCell = document.createElement("div");
            this.createBoardPieaceElem(emptyCell, "emptyCell");
            break;
          case TETRO:
            const tetroCell = document.createElement("div");
            this.createBoardPieaceElem(tetroCell, "tetroCell");
            break;
          case DONE:
            const doneTetroCell = document.createElement("div");
            this.createBoardPieaceElem(doneTetroCell, "doneTetroCell");
            break;
          default:
            break;
        }
      });
    });
  }

  //Draw game board in browser
  renderGameBoard() {
    this.createGameBoardElem();
    this.drawGameBoard();
  }

  makeMoveDown(interval) {
    this.n += 1;
    const currentCoordinates = this.findCurrentTetrominoPiecesCoordinates();
    const canMove = this.checkTetrominoMoveDownPossibility(currentCoordinates);
    if (!canMove) {
      clearInterval(interval);
      this.tetroMovingInProgress = false;
      currentCoordinates.forEach((coordinate) => {
        matrix_fake[coordinate[0]][coordinate[1]] = 2;
      });
      this.makeGame();
    } else {
      this.updateMatrixAfterMoveDown(currentCoordinates);
    }
    this.renderGameBoard();
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
      } else if (matrix_fake[coordinate[0] + 1][coordinate[1]] !== 2) {
        return true;
      } else {
        return false;
      }
    });

    const canMove = movingPossibilities.every((value) => value === true);

    return canMove;
  }

  checkTetrominoMoveLeftPossibility(currentCoordinates) {
    const movingPossibilities = currentCoordinates.map((coordinate, i) => {
      if (coordinate[1] - 1 < 0) {
        return false;
      } else if (matrix_fake[coordinate[0]][coordinate[1] - 1] !== 2) {
        return true;
      } else {
        return false;
      }
    });

    const canMove = movingPossibilities.every((value) => value === true);

    return canMove;
  }

  checkTetrominoMoveRightPossibility(currentCoordinates) {
    const movingPossibilities = currentCoordinates.map((coordinate, i) => {
      if (coordinate[1] + 1 > 9) {
        return false;
      } else if (matrix_fake[coordinate[0]][coordinate[1] + 1] !== 2) {
        return true;
      } else {
        return false;
      }
    });

    const canMove = movingPossibilities.every((value) => value === true);

    return canMove;
  }

  // Updating MATRIX on next move
  updateMatrixAfterMoveDown(currentCoordinates) {
    currentCoordinates.forEach((coordinate) => {
      matrix_fake[coordinate[0]][coordinate[1]] = 0;
      matrix_fake[coordinate[0] + 1][coordinate[1]] = 1;
    });
  }

  updateMatrixAfterMoveLeft(currentCoordinates) {
    currentCoordinates.forEach((coordinate) => {
      matrix_fake[coordinate[0]][coordinate[1]] = 0;
      matrix_fake[coordinate[0]][coordinate[1] - 1] = 1;
    });
  }

  updateMatrixAfterMoveRight(currentCoordinates) {
    currentCoordinates.reverse().forEach((coordinate) => {
      matrix_fake[coordinate[0]][coordinate[1]] = 0;
      matrix_fake[coordinate[0]][coordinate[1] + 1] = 1;
    });
  }

  moveToLeft() {
    const currentCoordinates = this.findCurrentTetrominoPiecesCoordinates();
    const canMove = this.checkTetrominoMoveLeftPossibility(currentCoordinates);
    if (!canMove) {
      return;
    } else {
      this.updateMatrixAfterMoveLeft(currentCoordinates);
    }
    this.renderGameBoard();
  }

  moveToRight() {
    const currentCoordinates = this.findCurrentTetrominoPiecesCoordinates();
    const canMove = this.checkTetrominoMoveRightPossibility(currentCoordinates);
    if (!canMove) {
      return;
    } else {
      this.updateMatrixAfterMoveRight(currentCoordinates);
    }
    this.renderGameBoard();
  }

  rotate() {
    const currentCoordinates = this.findCurrentTetrominoPiecesCoordinates();
    const xCoordinates = currentCoordinates.map((x) => x[0]);
    const yCoordinates = currentCoordinates.map((y) => y[0]);
    const x1 =
      xCoordinates.reduce((acc, current) => acc + current, 0) /
      currentCoordinates.length;
    const y1 =
      yCoordinates.reduce((acc, current) => acc + current, 0) /
      currentCoordinates.length;
    const canMove = this.checkTetrominoMoveRightPossibility(currentCoordinates);
    const rotatedTetromino = [];
    if (!canMove) {
      return;
    } else {
      for (let i = 0; i < this.currentTetromino.length; i++) {
        rotatedTetromino.push([]);
        for (let j = 0; j < this.currentTetromino[i].length; j++) {
          rotatedTetromino[i][j] = this.currentTetromino[j][i];
        }
      }

      this.currentTetromino = rotatedTetromino.reverse();

      for (let i = 0; i < matrix_fake.length; i++) {
        for (let j = 0; j < matrix_fake[i].length; j++) {
          matrix_fake[i][j] = 0;
        }
      }

      this.currentTetromino.forEach((shapeRow, rowIndex) => {
        shapeRow.forEach((tetroPiece, pieceIndex) => {
          matrix_fake[Math.round(x1) + rowIndex][Math.round(y1) + pieceIndex] =
            tetroPiece;
        });
      });
    }
    this.renderGameBoard();
  }
}
