export const scoreServices = (() => {
   const incrementScore = (player) => {
      fetch("../../php/scores.php/scores", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ player: player }),
      })
      .then((response) => response.json())
      .then((data) => {
         console.log("Score updated:", data);
      })
      .catch((error) => console.error("Error:", error));
   }

   const getScores = async () => {
      const response = await fetch("../../php/scores.php/scores");
      try {
         const data = await response.json();
         return data;
      } catch (error) {
         console.error("Error:", error);
      }
   }

   return {
      incrementScore: incrementScore,
      getScores: getScores,
   };
})();