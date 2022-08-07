//PRE-GAME-ROUND VARIABLE ASSIGNMENTS

let start = document.querySelector(".start");
let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors")
let heading = document.querySelector(".heading");
let roundInfo = document.querySelector(".round");
let playerScore = document.querySelector("#playerScore");
let robotScore = document.querySelector("#robotScore");
let container = document.querySelector(".container");
let resetButton = document.querySelector(".reset");

let youChose = document.querySelector(".youChose");
let youChoseImage = document.querySelector(".youChose").previousElementSibling;
let youChoseText = document.querySelector(".youChoseText");
let robotChose = document.querySelector(".robotChose");
let robotChoseImage = document.querySelector(".robotChose").nextElementSibling;
let robotChoseText = document.querySelector(".robotChoseText");

let computedChoice;
let randomNumber; 
let playerSelection;
let computerSelection;

let playerWinCount = 0;
let computerWinCount = 0;
playerScore.textContent = playerWinCount;
robotScore.textContent = computerWinCount;
//let drawCount = 0;

let gameRounds = 3;
let round = 1;




//PRE-GAME-ROUND EVENT LISTENERS
window.addEventListener("load", disableButton);
window.addEventListener("load", hideGraphic);
window.addEventListener("load", hide(resetButton));

/*window.addEventListener("load", () => {
    roundInfo.classList.add("display-hide");
});*/

start.addEventListener("click", selectStart);

rock.addEventListener("click", getPlayerChoice);
paper.addEventListener("click", getPlayerChoice);
scissors.addEventListener("click", getPlayerChoice);



//FUNCTION-TRANSITION EVENT LISTENERS
youChoseImage.addEventListener("transitionend", () => {
    setTimeout(getComputerChoice, 500);
});

robotChoseImage.addEventListener("transitionend", () => {
playRound(playerSelection, computerSelection);
setTimeout(Game, 500);
updateScore();
});

resetButton.addEventListener("click", () => {
    location.reload();
})


//ACCESSORY FUNCTIONS

//Function to disable buttons
function disableButton () {
    rock.disable;
    rock.style.pointerEvents = "none";
    paper.disable;
    paper.style.pointerEvents = "none";
    scissors.disable;
    scissors.style.pointerEvents = "none";
}

//Function to enable buttons
function enableButton () {
    rock.enable;
    rock.style.pointerEvents = "auto";
    paper.enable;
    paper.style.pointerEvents = "auto";
    scissors.enable;
    scissors.style.pointerEvents = "auto";
}

//Function to hide graphics
function hideGraphic () {
    youChose.classList.add("display-hide");
    youChoseImage.classList.add("display-hide");
    robotChose.classList.add("display-hide");
    robotChoseImage.classList.add("display-hide");
}

//Function to set animations dependent on getPlayerChoice
function playerChoiceConsequence () {
    disableButton();

    youChose.classList.remove("display-hide");
    youChoseImage.classList.remove("display-hide");
    youChose.style.opacity = 0;
    youChoseImage.style.opacity = 0;

    setTimeout(()=>{
        youChose.style.opacity = 1;
        youChoseImage.style.opacity = 1;
    }, 500)
}

//Function to set animations dependent on getComputerChoice
function computerChoiceConsequence () {
    robotChose.classList.remove("display-hide");
    robotChoseImage.classList.remove("display-hide");
    robotChose.style.opacity = 0;
    robotChoseImage.style.opacity = 0;

    setTimeout(()=>{
    robotChose.style.opacity = 1;
    robotChoseImage.style.opacity = 1;
    }, 500)
}

//Function to apply a class that hides an element
function hide (target) {
    target.classList.add("display-hide");
}

//Function to reset essential game variables after each round
function cleanUp () {
    youChoseImage.setAttribute("src", "");
    youChoseText.textContent = "";
    robotChoseText.textContent = "";
    robotChoseImage.setAttribute("src", "");
}

//Function to update scores
function updateScore () {

    playerScore.style.opacity = 0;
    robotScore.style.opacity = 0;

    setTimeout(() => {
        playerScore.textContent = playerWinCount;
        robotScore.textContent = computerWinCount; 
        playerScore.style.opacity = 1;
        robotScore.style.opacity = 1;   
    } , 1500)   

}




//PROCEDURAL FUNCTIONS

//Function to instruct player to select button
function selectStart () {
    round++; //increment the round number
    roundInfo.textContent = `Round ${round - 1}`;

    enableButton();
    hideGraphic();
    cleanUp();
    heading.textContent= "Choose Below";
    heading.classList.toggle("animation-breathe");

    start.classList.add("display-hide");
    rock.classList.add("button-animate");
    paper.classList.add("button-animate");
    scissors.classList.add("button-animate");
}

//Function to collect player choice.
function getPlayerChoice (e) {

    heading.style.opacity = 0;

    setTimeout(() => {
        heading.textContent = "...Aaaand...";
        heading.style.opacity = 1;
    }, 700)

    if (this.id == "rock") {
        youChoseImage.setAttribute("src", "./player-rock.png");
    } else if (this.id == "paper") {
        youChoseImage.setAttribute("src", "./player-paper.png");
    } else {
        youChoseImage.setAttribute("src", "./player-scissors.png");
    }

    playerChoiceConsequence();

    setTimeout(()=>{
        youChoseText.textContent = this.id;
    }, 700)
    
    playerSelection = this.id;
    return playerSelection;
}

//Function to randomly generate a computer choice.
function getComputerChoice () {
    randomNumber = Math.floor(Math.random() * 3);
           
   switch(randomNumber){
       case 0:
           computedChoice = "rock";
           robotChoseImage.setAttribute("src", "./robo-rock.png");
           break;
       case 1:
           computedChoice = "paper";
           robotChoseImage.setAttribute("src", "./robo-paper.png");
           break;
       case 2:
           computedChoice = "scissors";
           robotChoseImage.setAttribute("src", "./robo-scissors.png");
           break;
       default:
           alert("Oops so buggy");
   }

computerChoiceConsequence();

heading.style.opacity = 0;
setTimeout(()=>{
    robotChoseText.textContent = computedChoice;
    heading.style.opacity = 1;
}, 1000)

   computerSelection = computedChoice;

   return computerSelection; 
} 

//Function to compare 9 permutations of computer and player inputs.
function playRound (playerSelection, computerSelection) {

    //playRound() win, lose and draw messages
    let win = "🥳 You won!";
    let lose = "😔 Oops You lost!";
    let draw = "✨ Its a draw!";

    //Reappear and change content of start button
    start.classList.remove("display-hide");

    heading.style.opacity = 0;
    setTimeout (() => {
        heading.classList.add("info-result");
        heading.style.opacity = 1;
        start.textContent = `Start Round ${round}`;
    }, 1000)


    if (playerSelection == "rock" && computerSelection == "rock") {
        //drawCount++;
        heading.textContent = draw;
        return draw;
        playerWinCount += 0;
        computerWinCount += 0;

    } else if (playerSelection == "rock" && computerSelection == "paper") {
        computerWinCount++;
        heading.textContent = lose;
        return lose;
        playerWinCount += 0;
        computerWinCount += 1;


    } else if (playerSelection == "rock" && computerSelection == "scissors"){
        playerWinCount++;
        heading.textContent = win;
        return win;
        playerWinCount += 1;
        computerWinCount += 0;

    } else if (playerSelection == "paper" && computerSelection == "paper"){
        //drawCount++;
        heading.textContent = draw;
        return draw;
        playerWinCount += 0;

    } else if (playerSelection == "paper" && computerSelection == "scissors"){
        computerWinCount++;
        heading.textContent = lose;
        return lose;
        playerWinCount += 0;
        computerWinCount += 1;

    } else if (playerSelection == "paper" && computerSelection == "rock"){
        playerWinCount++;
        heading.textContent = win;
        return win;
        playerWinCount += 1;
        computerWinCount += 0;

    } else if (playerSelection == "scissors" && computerSelection == "scissors"){
        //drawCount++;
        heading.textContent = draw;
        return draw;
        playerWinCount += 0;

    } else if (playerSelection == "scissors" && computerSelection == "rock"){
        computerWinCount++;
        heading.textContent = lose;
        return lose;
        playerWinCount += 0;
        computerWinCount += 1;

    } else if (playerSelection == "scissors" && computerSelection == "paper"){
        playerWinCount++;
        heading.textContent = win;
        return win;
        playerWinCount += 1;
        computerWinCount += 0;
    }
}

//End Game Function.
function Game () {
    if (playerWinCount == 3) {

        console.log("GAME OVER PLAYER WINS");
        start.classList.remove("display-hide");

        heading.style.opacity = 0;
    setTimeout (() => {
        heading.classList.add("info-result");
        heading.style.opacity = 1;
        start.textContent = "🎉You are the Champion!🎉";
        container.style.background = "#5765cd";
        endGame();
    }, 1500)

    } else if (computerWinCount == 3) {

        console.log("GAME OVER COMPUTER WINS");
        start.classList.remove("display-hide");

        heading.style.opacity = 0;
    setTimeout (() => {
        heading.classList.add("info-result");
        heading.style.opacity = 1;
        start.textContent = "😥Just bad luck😥";
        container.style.background = "#252526";
        endGame();
    }, 1500)

    } else {
        console.log("KEEP GOING");
    }        
}

function endGame () {
    resetButton.classList.remove("display-hide");
        disableButton();
        hideGraphic();
        start.removeEventListener("click", selectStart);
        start.style.pointerEvents = "none";
}