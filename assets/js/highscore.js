const highScoresList = document.getElementById("highScores");
const highScores = JSON.parse(localStorage.getItem("hsarray")) || [];

console.log(highScores);
