export const scoreServices = (() => {
  const incrementScore = async (player) => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/server.php/scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ player: player }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getScores = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/server.php/scores"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetScores = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/server.php/reset",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    incrementScore: incrementScore,
    getScores: getScores,
    resetScores: resetScores,
  };
})();
