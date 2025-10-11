// improt element for use and make variable
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.getElementById("new");
const msg = document.querySelector("#msg");
const msgContainer = document.querySelector(".msg-container");
let turn = true; // PlayerX, PlayerO

// Winning Possibility
let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// for 'reset' or 'new' game
const resetGame = () => {
  turn = true;
  enabledBtn();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      // For player X
      box.innerText = "X";
      turn = false;
      console.log("PLAYER X");
    } else {
      // For player O
      box.innerText = "O";
      turn = true;
      console.log("PLAYER O");
    }
    box.disabled = true;
    checkWinner();
  });
});

const disabledBtn = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};
const enabledBtn = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Print Winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}🎉`;
  msgContainer.classList.remove("hide");
  disabledBtn();
};

// Check winning possibilities for each box
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let patVal1 = boxes[pattern[0]].innerText;
    let patVal2 = boxes[pattern[1]].innerText;
    let patVal3 = boxes[pattern[2]].innerText;
    if (patVal1 != "" && patVal2 != "" && patVal3 != "") {
      if (patVal1 === patVal2 && patVal2 === patVal3) {
        showWinner(patVal1);
      }
    }
  }
};

// use addEventListener() for 'reset' or 'new' game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);