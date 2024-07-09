export class TicTacToePlayer {
   constructor(board) {
      this.board = board;
      const seed = [];
      for (let i = 0; i < this.board.size; i++) seed.push(0);
      this.playerRowsContainer = [...seed];
      this.playerColsContainer = [...seed];
      this.playerDiagonalContainer = [...seed];
      this.playerOppDiagonalContainer = [...seed];
   }

   fillCell(row, col) {
      this.playerRowsContainer[row]++;
      this.playerColsContainer[col]++;
      if (row === col) this.playerDiagonalContainer[row]++;
      if (row + col + 1 === this.board.size) this.playerOppDiagonalContainer[row]++;
      return this.#checkForWin(row, col);
   }

   reset() {
      const seed = [];
      for (let i = 0; i < this.board.size; i++) seed.push(0);
      this.playerRowsContainer = [...seed];
      this.playerColsContainer = [...seed];
      this.playerDiagonalContainer = [...seed];
      this.playerOppDiagonalContainer = [...seed];
   }

   #checkForWin(row, col) {
      if (this.#checkWinOnRow(row)) return "row";
      if (this.#checkWinOnColumn(col)) return "col";
      if (this.#checkWinOnDiagonal()) return "diagonal";
      if (this.#checkWinOnOppDiagonal()) return "oppdiagonal";
   }

   #checkWinOnRow(row) {
      return this.playerRowsContainer[row] === this.board.size;
   }

   #checkWinOnColumn(col) {
      return this.playerColsContainer[col] === this.board.size;
   }

   #checkWinOnDiagonal() {
      let sum = 0;
      for (const num of this.playerDiagonalContainer) sum += num;
      return sum === this.board.size;
   }

   #checkWinOnOppDiagonal() {
      let sum = 0;
      for (const num of this.playerOppDiagonalContainer) sum += num;
      return sum === this.board.size;
   }
}
