import { leaderboardServices } from "./ajax/leaderboard-services.mjs";

export const leaderboardHandler = (() => {
   const updateLeaderboard = async () => {
      try {
         const leaderboard = await leaderboardServices.getLeaderboard();
         const leaderboardBody = document.getElementById("leaderboard-body");
         leaderboardBody.innerHTML = "";
         leaderboard.forEach((player, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            `;
            leaderboardBody.appendChild(row);
         });
      } catch (error) {
         console.error("Error fetching leaderboard:", error);
      }
   };

   return {
      updateLeaderboard: updateLeaderboard
   };
})();
