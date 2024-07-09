export const scoreTracker = (() => {
   const setPlayerScore = (score) => {
      localStorage.setItem("player-score", `${score}`);
   };

   const getPlayerScore = () => {
      return localStorage.getItem("player-score");
   };

   const setCpuScore = (score) => {
      localStorage.setItem("cpu-score", `${score}`);
   };

   const getCpuScore = () => {
      return localStorage.getItem("cpu-score");
   };

   const setTies = (ties) => {
      localStorage.setItem("ties", `${ties}`);
   };

   const getTies = () => {
      return localStorage.getItem("ties");
   };

   return {
      setPlayerScore: setPlayerScore,
      getPlayerScore: getPlayerScore,
      setCpuScore: setCpuScore,
      getCpuScore: getCpuScore,
      setTies: setTies,
      getTies: getTies,
   };
})();
