export const leaderboardServices = (() => {
   const getLeaderboard = async () => {
      const response = await fetch("../../php/scores.php/leaderboard");
      try {
         const data = await response.json();
         return data;
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return {
      getLeaderboard: getLeaderboard
   };
})();
