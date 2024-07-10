export const leaderboardServices = (() => {
  const getLeaderboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/server.php/leaderboard"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    getLeaderboard: getLeaderboard,
  };
})();
