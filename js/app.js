import { scoreServices } from "./modules/ajax/score-services.mjs";
import { eventHandler } from "./modules/event-handler.mjs";
import { leaderboardHandler } from "./modules/leaderboard-handler.mjs";


const init = async () => {
  eventHandler.setupEventListeners();
  try {
    const scores = await scoreServices.getScores();
    document.getElementById("player-x-score").innerText = scores.playerX;
    document.getElementById("num-draws").innerText = scores.draws;
    document.getElementById("player-o-score").innerText = scores.playerO;
    leaderboardHandler.updateLeaderboard();
  } catch (error) {
    console.error("Error:", error);
  }
};

window.onload = init;
