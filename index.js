
        let randomNumber; //Initialize randomNumber variable.
        let computedChoice; //Initialize computedChoice variable which turns randomNumber into rock, paper or scissors.

        // Not necessary to be honest but helps avoid spelling and syntax issues on all dependencies
        let rock = "rock";
        let paper = "paper";
        let scissors = "scissors";

        //Function to collect player choice.
        let getPlayerChoice = () => prompt("Type rock or paper or scissors. \n\nDon't forget to check your spelling 😉").toLowerCase();

        //Function to randomly generate a computer choice.
        function getComputerChoice () {
            randomNumber = Math.floor(Math.random() * 3);
            
            switch(randomNumber){
                case 0:
                    computedChoice = rock;
                    break;
                case 1:
                    computedChoice = paper;
                    break;
                case 2:
                    computedChoice = scissors;
                    break;
                default:
                    alert("Oops so buggy");
            }

            return computedChoice;
        } 

        //Initialize win, lose and draw counts for player and computer;
            let playerWinCount = 0;
            let computerWinCount = 0;
            let drawCount = 0;
            let errorCount = 0;

        //Error feedback function for wrongly entered input (!= rock paper or scissors)
        function errorFeedback () {
            let errorText = document.getElementById("restart");
            errorText.innerHTML = "You spelled your input wrongly." + "<br><br>" +"We will reset the page and give you a clean start in 5 seconds";
        }

        //Restart page function
        function restart () {
            location.reload();
        }

        //Function to compare 9 permutations of computer and player inputs.
        function playRound (playerSelection, computerSelection) {

            //playRound() win, lose and draw messages
            let win = `🥳 You won! You chose ${playerSelection} and the computer chose ${computerSelection}`;
            let lose = `😔 Oops You lost! You chose ${playerSelection} and the computer chose ${computerSelection}`;
            let draw = `✨ Its a draw! You both chose ${playerSelection}`;

            if ((playerSelection != rock && playerSelection != paper && playerSelection != scissors)){
                errorCount++
                return "Either your spelling was wrong; you entered an unsupported value; or you entered no value."

            } else if (playerSelection == rock && computerSelection == rock){
                drawCount++;
                return draw;
            } else if (playerSelection == rock && computerSelection == paper) {
                computerWinCount++;
                return lose;
            } else if (playerSelection == rock && computerSelection == scissors){
                playerWinCount++;
                return win;

            } else if (playerSelection == paper && computerSelection == paper){
                drawCount++;
                return draw;
            } else if (playerSelection == paper && computerSelection == scissors){
                computerWinCount++;
                return lose;
            } else if (playerSelection == paper && computerSelection == rock){
                playerWinCount++;
                return win;

            } else if (playerSelection == scissors && computerSelection == scissors){
                drawCount++;
                return draw;
            } else if (playerSelection == scissors && computerSelection == rock){
                computerWinCount++;
                return lose;
            } else if (playerSelection == scissors && computerSelection == paper){
                playerWinCount++;
                return win;
            }

        }
        
        //Set number of rounds per game session.
        let gameRounds = 5;


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
    