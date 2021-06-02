let options = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

class InputInfo
{
    constructor(valid, playerChoice, computerChoice)
    {
        this.valid = valid;
        this.playerChoice = playerChoice;
        this.computerChoice = computerChoice;
    }
}

function game()
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
    let playerSelectionIndex;
    let computerSelectionIndex;
    let info = new InputInfo(false, -1, -1);
    checkValid(info, playerSelection, computerSelection);
    if (info.valid)
    {
        playerSelectionIndex = info.playerChoice;
        computerSelectionIndex = info.computerChoice;
        if (playerSelectionIndex === (computerSelectionIndex + 1) % 3)
        {
            playerScore++;
            return `You Win! ${capitalize(options[playerSelectionIndex])} beats ${capitalize(options[computerSelectionIndex])}`;
        }
        else if (computerSelectionIndex === (playerSelectionIndex + 1) % 3)
        {
            computerScore++;
            return `You Lose! ${capitalize(options[computerSelectionIndex])} beats ${capitalize(options[playerSelectionIndex])}`;
        }
        else
        {
            return `Tie Game! You both picked ${capitalize(options[playerSelectionIndex])}`;
        }
    }
    return false;
}

function checkValid(info, playerSelection, computerSelection)
{
    let playerSelectionIndex;
    let computerSelectionIndex;
    if (typeof (playerSelection) === typeof ("") && typeof (computerSelection) === typeof (""))
    {
        info.valid = true;
        info.playerChoice = convertToOptionIndex(playerSelection);
        info.computerChoice = convertToOptionIndex(computerSelection);
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

    if (playerSelectionIndex < 0 || computerSelectionIndex < 0)
    {
        console.log("Invalid Input");
        info.valid = false;
        return;
    }
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