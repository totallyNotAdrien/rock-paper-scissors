let playerScore = 0;
let computerScore = 0;

const NUM_OPTIONS = 3;
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const maxScore = 5;

const winStates =
{
    PLAYER_WIN: "PLAYER_WIN",
    COMPUTER_WIN: "COMPUTER_WIN",
    TIE: "TIE",
    ERROR: "ERROR"
};

class InputInfo
{
    constructor(playerChoice, computerChoice, valid = false)
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


function computerPlay()
{
    let choice = Math.floor(Math.random() * NUM_OPTIONS);
    return choice;
}

function playRound(playerSelection, computerSelection)
{
    if (playerScore < maxScore && computerScore < maxScore)
    {
        let info = new InputInfo(-1, -1, false);
        checkValidity(info, playerSelection, computerSelection);
        if (info.valid)
        {
            let winner = getWinner(info);
            updateScoreDisplay();
            displayRoundWinner(winner);
            tryDisplayGameWinner();
        }
    }
}

//rock paper scissors' options are cyclic with each option beating the one
//immediately "before" as defined above, so modulo can be used instead 
//of comparing strings
function getWinner(info)
{
    let winner = winStates.ERROR;
    if (info instanceof InputInfo && info.valid)
    {
        if (info.playerChoice === (info.computerChoice + 1) % NUM_OPTIONS)
        {
            playerScore++;
            winner = winStates.PLAYER_WIN;
        }
        else if (info.computerChoice === (info.playerChoice + 1) % NUM_OPTIONS)
        {
            computerScore++;
            winner = winStates.COMPUTER_WIN;
        }
        else if(info.playerChoice === info.computerChoice)
        {
            winner = winStates.TIE;
        }
    }
    return winner;
}

function checkValidity(info, playerSelection, computerSelection)
{
    if (info instanceof InputInfo)
    {
        info.valid = false;
        if (typeof playerSelection === typeof 1 && typeof computerSelection === typeof 1)
        {
            info.valid = playerSelection >= 0 && computerSelection >= 0;
            info.playerChoice = playerSelection % NUM_OPTIONS;
            info.computerChoice = computerSelection % NUM_OPTIONS;
        }
        else
        {
            console.error("ERROR: Invalid data type for player or computer selection");
            info.valid = false;
        }
    }
    else
    {
        console.error("ERROR: No InputInfo");
    }
}

function updateScoreDisplay()
{
    scoreDisplay.style.whiteSpace = "pre";
    scoreDisplay.textContent = `Your Score: ${playerScore}        Computer Score: ${computerScore}`;
}

function displayRoundWinner(winner)
{
    let output = " ";
    switch (winner)
    {
        case winStates.PLAYER_WIN:
            output = "Point for You";
            break;
        case winStates.COMPUTER_WIN:
            output = "Point for Computer";
            break;
        case winStates.TIE:
            output = "Tie";
            break;
        default:
            console.log("Round winner error");
    }
    whoWonLast.textContent = output;
}

function tryDisplayGameWinner()
{
    if (playerScore >= 5 || computerScore >= 5)
    {
        whoWonLast.textContent = (playerScore >= 5) ? "You Win!" : "Computer Wins!";
        resetButton.style.visibility = "visible";
    }
}

function reset()
{
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    whoWonLast.style.whiteSpace = "pre";
    whoWonLast.textContent = " ";
    resetButton.style.visibility = "hidden";
}