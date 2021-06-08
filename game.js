let options = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const maxRounds = 5;

const winStates =
{
    PLAYER_WIN: "player_win",
    COMPUTER_WIN: "computer_win",
    TIE: "tie"
};

class InputInfo
{
    constructor(valid, playerChoice, computerChoice)
    {
        this.valid = valid;
        this.playerChoice = playerChoice;
        this.computerChoice = computerChoice;
    }
}

const rockButton = document.querySelector("#rock-button");
rockButton.addEventListener('click', () =>
{
    playRound(ROCK, computerPlay());
});

const paperButton = document.querySelector("#paper-button");
paperButton.addEventListener('click', () =>
{
    playRound(PAPER, computerPlay());
});

const scissorsButton = document.querySelector("#scissors-button");
scissorsButton.addEventListener('click', () =>
{
    playRound(SCISSORS, computerPlay());
});

const scoreDisplay = document.querySelector("#score-display");
const whoWonLast = document.querySelector("#who-won-last");

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener('click', reset);

function game1()
{
    playerScore = 0;
    computerScore = 0;
    let roundsCompleted = 0;
    do
    {
        let input = prompt("Choose rock, paper, or scissors");
        let output = playRound(convertToOptionIndex(input), computerPlay());
        if (!output)
        {
            console.log("Round could not be completed");
        }
        else
        {
            console.log(`Your Score: ${playerScore}, Computer Score: ${computerScore}`);
            console.log(output);
            roundsCompleted++;
        }
    } while (roundsCompleted < 5);

    console.log("-----------------------------------");
    console.log(`Your Score: ${playerScore}, Computer Score: ${computerScore}`);
    if (playerScore > computerScore)
    {
        console.log("You win overall!");
    }
    else if (computerScore > playerScore)
    {
        console.log("Computer wins overall!");
    }
    else
    {
        console.log("It's a Draw!");
    }
}



function computerPlay()
{
    let choice = Math.floor(Math.random() * 3);
    return choice;
}

function playRound(playerSelection, computerSelection)
{
    if (playerScore < maxRounds && computerScore < maxRounds)
    {
        let playerSelectionIndex;
        let computerSelectionIndex;
        let info = new InputInfo(false, -1, -1);
        let winner;
        checkValid(info, playerSelection, computerSelection);
        if (info.valid)
        {
            playerSelectionIndex = info.playerChoice;
            computerSelectionIndex = info.computerChoice;
            if (playerSelectionIndex === (computerSelectionIndex + 1) % 3)
            {
                playerScore++;
                winner = winStates.PLAYER_WIN;
            }
            else if (computerSelectionIndex === (playerSelectionIndex + 1) % 3)
            {
                computerScore++;
                winner = winStates.COMPUTER_WIN
            }
            else
            {
                winner = winStates.TIE;
            }
            updateScoreDisplay();
            let output;
            switch (winner)
            {
                case winStates.PLAYER_WIN:
                    output = "Point for You";
                    break;
                case winStates.COMPUTER_WIN:
                    output = "Point for Computer";
                    break;
                default:
                    output = "Tie";
            }
            if(playerScore >= 5 || computerScore >= 5)
            {
                whoWonLast.textContent = playerScore >= 5 ? "You Win!" : "Computer Wins!";
                resetButton.style.display = "block";
            }
            else
            {
                whoWonLast.textContent = output;
            }
        }
    }
    return false;
}

function checkValid(info, playerSelection, computerSelection)
{
    if (typeof (playerSelection) === typeof ("") && typeof (computerSelection) === typeof (""))
    {
        info.playerChoice = convertToOptionIndex(playerSelection);
        info.computerChoice = convertToOptionIndex(computerSelection);
        info.valid = info.playerChoice >= 0 && info.computerChoice >= 0;
    }
    else if (typeof (playerSelection) === typeof (1) && typeof (computerSelection) === typeof (1))
    {
        info.valid = playerSelection >= 0 && computerSelection >= 0;
        info.playerChoice = playerSelection;
        info.computerChoice = computerSelection;
    }
    else
    {
        console.log("Invalid Input");
        info.valid = false;
        return;
    }
}

function reset()
{
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    whoWonLast.style.whiteSpace = "pre";
    whoWonLast.textContent = " ";
    resetButton.style.display = "none";
}

function updateScoreDisplay()
{
    scoreDisplay.style.whiteSpace = "pre";
    scoreDisplay.textContent = `Your Score: ${playerScore}        Computer Score: ${computerScore}`;
}

function capitalize(text)
{
    return text[0].toUpperCase() + text.substr(1);
}

function convertToOptionIndex(optionString)
{
    optionString = optionString.trim();
    optionString = optionString.toLowerCase();
    return options.indexOf(optionString);
}