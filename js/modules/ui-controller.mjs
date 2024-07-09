export const uiController = () => {

   const playerXScore = document.getElementById("player-x-score");
   const numDraws = document.getElementById("num-draws");
   const playerOScore = document.getElementById("player-o-score");
   const leaderBoard = document.getElementById("leader-board");

   const updateScores = (scores) => {
      playerXScore.textContent = scores.playerX;
      numDraws.textContent = scores.draws;
      playerOScore.textContent = scores.playerO;
   };

   const showLeaderBoard = (leaderboard) => {
      leaderBoard.classList.toggle("hidden");
   };

   return {
      updateScores: updateScores,
      showLeaderBoard: showLeaderBoard
   }
};