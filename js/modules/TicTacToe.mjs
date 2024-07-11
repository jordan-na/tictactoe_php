import { scoreServices } from "./ajax/score-services.mjs";
import { leaderboardHandler } from "./leaderboard-handler.mjs";
import { TicTacToePlayer } from "./TicTacToePlayer.mjs";

const playerTurnSymbol = document.querySelector("#player-turn-symbol");
const grid = document.querySelectorAll(".grid-cell");
const scores = document.querySelectorAll(".score-num");
const gameResultBg = document.querySelector("#game-result-container");
const gameResultContainer = document.querySelector("#game-result-mssg");
const gameResultMssg = document.querySelector("#game-result-mssg h2");
const gameResultMssgBig = document.querySelector("#game-result-mssg h1");
const winnerSymbol = document.querySelector("#game-result-mssg h1 img");
const actionBtns = document.querySelector("#action-btns");
const resetBtn = document.querySelector("#reset-btn");

export class TicTacToe {
  constructor(size) {
    this.size = size;
    this.numCells = size * size;
    this.filledCells = 0;
    this.player = new TicTacToePlayer(this);
    this.cpu = new TicTacToePlayer(this);
  }

  async startMoves(cell, row, col) {
    if (await this.#playerFillCell(cell, row, col)) {
      this.#toggleEvents();
      playerTurnSymbol.src = "assets/o_gray.svg";
      await this.wait(1500);
      this.#cpuFillCell();
      this.#toggleEvents();
      resetBtn.classList.toggle("disabled");
      playerTurnSymbol.src = "assets/x_gray.svg";
    }
  }

  async #playerFillCell(cell, row, col) {
    resetBtn.classList.toggle("disabled");
    this.filledCells++;
    cell.classList.add("x");
    const result = this.player.fillCell(row, col);
    if (result) {
      this.#highlightWinningCells(row, col, result);
      const scoresData = await scoreServices.incrementScore("X");
      scores[0].innerText = `${scoresData.playerX}`;
      await leaderboardHandler.updateLeaderboard();
      await this.wait(500);
      this.#showPlayerWinner();
      return false;
    } else if (this.filledCells === this.numCells) {
      const scoresData = await scoreServices.incrementScore("draw");
      scores[1].innerText = `${scoresData.draws}`;
      await leaderboardHandler.updateLeaderboard();
      await this.wait(500);
      this.#showTie();
      return false;
    }
    return true;
  }

  async #cpuFillCell() {
    let cell;
    let index;
    do {
      index = Math.floor(Math.random() * grid.length);
      cell = grid[index];
    } while (cell.classList.contains("x") || cell.classList.contains("o"));
    this.filledCells++;
    cell.classList.add("o");
    const row = Math.floor(index / this.size);
    const col = index % this.size;
    const result = this.cpu.fillCell(row, col);
    if (result) {
      this.#highlightWinningCells(row, col, result);
      const scoresData = await scoreServices.incrementScore("O");
      scores[2].innerText = `${scoresData.playerO}`;
      await leaderboardHandler.updateLeaderboard();
      await this.wait(500);
      this.#showCpuWinner();
    } else if (this.filledCells === this.numCells) {
      const scoresData = await scoreServices.incrementScore("draw");
      scores[1].innerText = `${scoresData.draws}`;
      await leaderboardHandler.updateLeaderboard();
      await this.wait(500);
      this.#showTie();
    }
  }

  #highlightWinningCells(row, col, result) {
    const cells = [];
    if (result === "row") {
      const starting = row * this.size;
      for (let i = starting; i < starting + this.size; i++) {
        cells.push(grid[i]);
      }
    } else if (result === "col") {
      const starting = col;
      for (let i = starting; i < grid.length; i += this.size) {
        cells.push(grid[i]);
      }
    } else if (result === "diagonal") {
      const starting = 0;
      for (let i = starting; i < grid.length; i += this.size + 1) {
        cells.push(grid[i]);
      }
    } else if (result === "oppdiagonal") {
      const starting = this.size - 1;
      for (let i = starting; i <= grid.length - this.size; i += this.size - 1) {
        cells.push(grid[i]);
      }
    }
    cells.forEach((cell) => cell.classList.add("winner"));
  }

  wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  #toggleEvents() {
    for (const cell of grid) {
      cell.classList.toggle("no-events");
    }
  }

  toggleGameResult() {
    gameResultContainer.classList.toggle("grow");
    gameResultBg.classList.toggle("hide");
    gameResultMssg.classList.toggle("fade-in");
    gameResultMssgBig.classList.toggle("fade-in");
    actionBtns.classList.toggle("fade-in");
  }

  #showPlayerWinner() {
    winnerSymbol.classList.remove("hide");
    gameResultMssgBig.classList.remove("loser");
    gameResultMssgBig.classList.remove("tie");
    this.toggleGameResult();
    gameResultMssg.innerText = "You Won!";
    gameResultMssgBig.childNodes[1].nodeValue = "Takes the round!";
    winnerSymbol.src = "assets/x.svg";
  }

  #showCpuWinner() {
    winnerSymbol.classList.remove("hide");
    gameResultMssgBig.classList.remove("tie");
    this.toggleGameResult();
    gameResultMssg.innerText = "You Lost!";
    gameResultMssgBig.classList.add("loser");
    gameResultMssgBig.childNodes[1].nodeValue = "Takes the round!";
    winnerSymbol.src = "assets/o.svg";
  }

  #showTie() {
    gameResultMssgBig.classList.remove("loser");
    gameResultMssgBig.classList.add("tie");
    winnerSymbol.classList.add("hide");
    this.toggleGameResult();
    gameResultMssg.innerText = "Round was a tie!";
    gameResultMssgBig.childNodes[1].nodeValue = "No One Takes the round!";
  }

  nextRound() {
    this.toggleGameResult();
    this.#clearBoard();
    this.player.reset();
    this.cpu.reset();
    this.filledCells = 0;
    resetBtn.classList.remove("disabled");
  }

  quit() {
    close();
  }

  async reset() {
    const scoresData = await scoreServices.resetScores();
    await leaderboardHandler.updateLeaderboard();
    scores[0].innerText = `${scoresData.playerX}`;
    scores[1].innerText = `${scoresData.draws}`;
    scores[2].innerText = `${scoresData.playerO}`;
    this.player.reset();
    this.cpu.reset();
    this.#clearBoard();
  }

  #clearBoard() {
    for (const cell of grid) {
      cell.classList.remove("x");
      cell.classList.remove("o");
      cell.classList.remove("winner");
    }
  }
}
