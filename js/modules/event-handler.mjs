import { TicTacToe } from "./TicTacToe.mjs";

export const eventHandler = (() => {
  const ticTacToe = new TicTacToe(3);

  const setupResetBtn = () => {
    document.querySelector("#reset-btn").addEventListener("click", function () {
      ticTacToe.reset();
    });
  };

  const setupGridListeners = () => {
    const grid = document.querySelectorAll(".grid-cell");
    for (let i = 0; i < grid.length; i++) {
      const cell = grid[i];
      const row = Math.floor(i / ticTacToe.size);
      const col = i % ticTacToe.size;
      cell.addEventListener("click", function () {
        ticTacToe.startMoves(cell, row, col);
      });
    }
  };

  const setupActionBtnListeners = () => {
    document
      .querySelector("#quit-btn")
      .addEventListener("click", ticTacToe.quit);
    document
      .querySelector("#next-round-btn")
      .addEventListener("click", function () {
        ticTacToe.nextRound();
      });
  };

  const setupEventListeners = () => {
    setupResetBtn();
    setupGridListeners();
    setupActionBtnListeners();
  };

  return {
    setupEventListeners: setupEventListeners,
  };
})();
