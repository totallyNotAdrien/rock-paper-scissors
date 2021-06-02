let options = ["rock", "paper", "scissors"];

function computerPlay()
{
    let choice = Math.floor( Math.random() * 3);
    return choice;
}


function capitalize(text)
{
    return text[0].toUpperCase() + text.substr(1);
}

function playRound(playerSelection, computerSelection)
{
    let playerSelectionIndex;
    let computerSelectionIndex;
    if(typeof(playerSelection) === typeof("") && typeof(computerSelection) === typeof(""))
    {
        playerSelectionIndex = convertToOptionIndex(playerSelection);
        computerSelectionIndex = convertToOptionIndex(computerSelection);
    }
    else if(typeof(playerSelection) === typeof(1) && typeof(computerSelection) === typeof(1))
    {
        playerSelectionIndex = playerSelection;
        computerSelectionIndex = computerSelection;
    }
    else
    {
        return "Invalid Input";
    }

    if(playerSelectionIndex < 0 || computerSelectionIndex < 0)
    {
        return "Invalid Input";
    }

    if( playerSelectionIndex === (computerSelectionIndex + 1)%3)
    {
        return `You Win! ${capitalize(options[playerSelectionIndex])} beats ${capitalize(options[computerSelectionIndex])}`;
    }
    else if(computerSelectionIndex === (playerSelectionIndex + 1)%3)
    {
        return `You Lose! ${capitalize(options[computerSelectionIndex])} beats ${capitalize(options[playerSelectionIndex])}`;
    }
    else
    {
        return `Tie Game! You both picked ${capitalize(options[playerSelectionIndex])}`;
    }
}

function areValid(playerSelection, computerSelection)
{
    
}

function convertToOptionIndex(optionString)
{
    optionString = optionString.toLowerCase();
    return options.indexOf(optionString);
}