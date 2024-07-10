import { scoreServices } from "./modules/ajax/score-services.mjs";
import { eventHandler } from "./modules/event-handler.mjs";
import { uiController } from "./modules/ui-controller.mjs";

const init = async () => {
   eventHandler.setupEventListeners();
   try {
      const scores = await scoreServices.getScores();
      uiController.updateScores(scores);
   } catch (error) {
      console.error("Error:", error);
   }
};

window.onload = init;
