let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissor"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "GAME WAS DRAW.. PLAY AGAIN..!!";
  msg.style.backgroundColor = "Grey";
};

const showWinner = (userwin, userChoice, compChoice) => {
  if (userwin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `YOU WIN! Your '${userChoice}' Beats '${compChoice}'`;
    msg.style.backgroundColor = "Green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `YOU LOSE! '${compChoice}' Beats Your '${userChoice}'`;
    msg.style.backgroundColor = "Red";
  }
};

const playGame = (userChoice) => {
  console.log("User Choice =", userChoice);
  // Genarate computer choice -> Modular
  const compChoice = genCompChoice();
  console.log("Computer Choice =", compChoice);

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      // scissor, paper
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      // rock, scissor
      userWin = compChoice === "Scissor" ? false : true;
    } else {
      // rock, paper
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  console.log(choice);
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    // console.log("Choice was CLicked!!", choiceID);
    playGame(userChoice);
  });
});
