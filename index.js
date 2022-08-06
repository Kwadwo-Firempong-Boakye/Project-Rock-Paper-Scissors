//PRE-GAME-ROUND VARIABLE ASSIGNMENTS

let start = document.querySelector(".start");
let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors")
let heading = document.querySelector(".heading");

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
let drawCount = 0;

let gameRounds = 3;




//PRE-GAME-ROUND EVENT LISTENERS
window.addEventListener("load", disableButton);
window.addEventListener("load", hideGraphic);

start.addEventListener("click", selectStart);

rock.addEventListener("click", getPlayerChoice);
paper.addEventListener("click", getPlayerChoice);
scissors.addEventListener("click", getPlayerChoice);




//FUNCTION TRANSITION EVENT LISTENERS
youChoseImage.addEventListener("transitionend", getComputerChoice);

robotChoseImage.addEventListener("transitionend", () => {
playRound(playerSelection, computerSelection);
start.disable = false;
});




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
    youChose.classList.add("zero-opacity");
    youChoseImage.classList.add("zero-opacity")
    youChose.classList.remove("display-hide");
    youChoseImage.classList.remove("display-hide");
    
    setTimeout(()=>{
        youChose.classList.remove("zero-opacity");
        youChoseImage.classList.remove("zero-opacity");
    }, 1000)
}

//Function to set animations dependent on getComputerChoice
function computerChoiceConsequence () {
    robotChose.classList.add("zero-opacity");
    robotChoseImage.classList.add("zero-opacity")
    robotChose.classList.remove("display-hide");
    robotChoseImage.classList.remove("display-hide");

    setTimeout(()=>{
        robotChose.classList.remove("zero-opacity");
        robotChoseImage.classList.remove("zero-opacity");
    }, 1000)
}




//PROCEDURAL FUNCTIONS

//Function to instruct player to select button
function selectStart () {
    enableButton();
    heading.textContent= "Choose Below";
    heading.classList.add("animation-breathe");
    start.disabled = true;
    
}

//Function to collect player choice.
function getPlayerChoice (e) {

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
    }, 1000)
    

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

   setTimeout(()=>{
        robotChoseText.textContent = computedChoice;
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


    if (playerSelection == "rock" && computerSelection == "rock") {
        drawCount++;
        heading.textContent = draw;
        return draw;

    } else if (playerSelection == "rock" && computerSelection == "paper") {
        computerWinCount++;
        heading.textContent = lose;
        return lose;


    } else if (playerSelection == "rock" && computerSelection == "scissors"){
        playerWinCount++;
        heading.textContent = win;
        return win;

    } else if (playerSelection == "paper" && computerSelection == "paper"){
        drawCount++;
        heading.textContent = draw;
        return draw;

    } else if (playerSelection == "paper" && computerSelection == "scissors"){
        computerWinCount++;
        heading.textContent = lose;
        return lose;

    } else if (playerSelection == "paper" && computerSelection == "rock"){
        playerWinCount++;
        heading.textContent = win;
        return win;

    } else if (playerSelection == "scissors" && computerSelection == "scissors"){
        drawCount++;
        heading.textContent = draw;
        return draw;

    } else if (playerSelection == "scissors" && computerSelection == "rock"){
        computerWinCount++;
        heading.textContent = lose;
        return lose;

    } else if (playerSelection == "scissors" && computerSelection == "paper"){
        playerWinCount++;
        heading.textContent = win;
        return win;
    }

}

//console.log(playRound (playerSelection, computerSelection));
        


        
        
       

        //Full Game Function.
        function Game () {

            //Loop to play game (gameRound) number of times and log win, lose and draw counts.
            for (let i = 1; i <= gameRounds; i++) {

                let thisRound = playRound(getPlayerChoice(), getComputerChoice());
                console.log(thisRound);

                if (errorCount > 0){
                    console.log("You spelled your input wrongly.")
                    errorFeedback();
                    setTimeout(restart, 5000);
                    return;
                }
            }

            //Conditions to determine final game outcome.
            if (playerWinCount > computerWinCount) {
                console.log(`Congratulations! 🥳 Out of ${gameRounds} game rounds, You won ${playerWinCount} and the Computer won ${computerWinCount}. There were ${drawCount} draws`);
            } else if (computerWinCount > playerWinCount) {
                console.log(`Oops! You lost. 🤪 Out of ${gameRounds} game rounds, You won ${playerWinCount} and the Computer won ${computerWinCount}. There were ${drawCount} draws`);
            } else {
                console.log(`Its a tie! 🤷 Out of ${gameRounds} game rounds, You won ${playerWinCount} and the Computer won ${computerWinCount}. There were ${drawCount} draws`);
           }

           //Reset Counts
            playerWinCount = 0;
            computerWinCount = 0;
            drawCount = 0;
        }
    