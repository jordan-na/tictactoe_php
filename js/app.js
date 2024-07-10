import { leaderboardServices } from "./modules/ajax/leaderboard-services.mjs";
import { scoreServices } from "./modules/ajax/score-services.mjs";
import { eventHandler } from "./modules/event-handler.mjs";

const displayLeaderboard = async () => {
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

const init = async () => {
  eventHandler.setupEventListeners();
  try {
    const scores = await scoreServices.getScores();
    document.getElementById("player-x-score").innerText = scores.playerX;
    document.getElementById("num-draws").innerText = scores.draws;
    document.getElementById("player-o-score").innerText = scores.playerO;
    displayLeaderboard();
  } catch (error) {
    console.error("Error:", error);
  }
};

window.onload = init;
