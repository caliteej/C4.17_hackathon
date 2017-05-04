
//player object that allows flipping between players, would also make changing to a 2 player game easy
var player = {
    One: {
        color: 'red',
        wins: 0,
        changePlayer: function() {
            currentPlayer = player.Two;
        }
    },
    Two: {
        color: 'blue',
        wins: 0,
        changePlayer: function() {
            currentPlayer = player.Three;
        }
    },
    Three: {
        color: 'green',
        wins: 0,
        changePlayer: function() {
            currentPlayer = player.One;
        }
    }
};

var currentPlayer = player.One;

$(document).ready(function(){
    createBoard();
    $('.dropTokenHere').click(tokenDrop);
    $('input').click(function() {
        connectNumber = Number($('input[name=winningCount]:checked').val());
    });
});

var connectNumber = 2;

var boardSizeColumns = 6;
var boardSizeRows = 7;

var boardDivs = [];

//dynamically create the board so that for future version the player could choose the size on their own
//As the board is being created it is also styling each div and adding classes
function createBoard() {
    for (var i = boardSizeRows; i >= 0; i--) {
        var row = i;
        for (var j = 0; j < boardSizeColumns; j++) {
            var column = j;
            var newDiv = $('<div>');
            if (i === boardSizeRows) {
                $('.dropspot').append(newDiv);
                $(newDiv).css({
                    "background-color": "blue",
                    "height": "5vmin",
                    "width": "12vmin",
                    "border": "solid black 1px",
                    "color": "white",
                });
                $(newDiv).text('Token Slot ' + column);
                $(newDiv).addClass('dropTokenHere');
                $(newDiv).attr('column', column);
                column++;
            }
        }
    }
//After creating the token drop divs each row is then built one by one, each div is also getting a unique id
//The id will be used later to modify divs based on the token drop
    for (var k = boardSizeRows-1; k >= 0; k--) {
        var row = k;
        var rowDiv = $('<div>');
        $('.tokenspot').append(rowDiv);
        for (var col = 0; col < boardSizeColumns; col++) {
            var column = col;
            var colDiv = $('<div>');
            $(rowDiv).append(colDiv);
            $(colDiv).attr('id', '' + column + row);
            $(colDiv).addClass('tokenHolder');
            $(colDiv).css({
                "border-radius": '50%',
                "border": "3px solid black",
                'height': '10vmin',
                'width': '10vmin',
                "display": "inline-block"
            });
            var div = new divCreator();
                div.column = col;
                div.row = k;
                div.open = 'open';
                div.color = null;
                boardDivs.push(div);
                column++;
        }
    }
    function divCreator(){
        var newDiv = {
            column: null,
            row: null,
            color: null
        }
    }

}

var columnObjectsArray = [];


//drop token onto the gameboard, find associated div, change token color on both the board and in the associated object
function tokenDrop(){
    columnObjectsArray = [];
    var divCol = $(this).attr('column');


    for(var i = 0; i < boardDivs.length; i++){
        if(boardDivs[i].column == divCol){
            columnObjectsArray.push(boardDivs[i]);
        } else {
        }
    }
    columnObjectsArray = columnObjectsArray.reverse();
    for(var j = 0; j < columnObjectsArray.length; j++) {
        if (columnObjectsArray[j].open === 'open') {
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = currentPlayer.color;
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            currentPlayer.changePlayer();
            checkWinPatterns(divCol, j);
            return;
        } else {
        }
    }
}

//after each coin drop the game will check for any possible win

function checkWinPatterns(divCol, divRow) {
    checkColumnWins();
    checkRowWins();
    checkDiagonalWins(divCol, divRow);
}



function checkColumnWins() {
    var matchCount = 0;

    columnObjectsArray = [];

    for (var col = 0; col < boardSizeColumns; col++) {
        columnObjectsArray = [];
        //build array of objects in the (col) column to then compare their colors
        for (var i = 0; i < boardDivs.length; i++) {
            if (boardDivs[i].column == col) {
                columnObjectsArray.push(boardDivs[i]);
            }
        }
        //flip array so that objects start from bottom to top
        columnObjectsArray = columnObjectsArray.reverse();
        //loop through new array to see if any matches within the column exist
        //we are also checking to see if a 'rainbow' will occur which would be 3 alternating colors in a row
        for (var j = 0; j < columnObjectsArray.length; j) {
            for (n = 0; n < columnObjectsArray.length; n++) {
                while (columnObjectsArray[n].color !== null) {
                    if (columnObjectsArray[n].color !== columnObjectsArray[n + 1].color && columnObjectsArray[n].color !== columnObjectsArray[n + 2].color && columnObjectsArray[n + 1].color !== columnObjectsArray[n + 2].color &&columnObjectsArray[n+2].color !== null) {
                        alert ('Double Rainbow All the Way....Wow....Wow');
                        break;
                    } else {
                        break;
                    }
                }
            }
            if (columnObjectsArray[j].color === null) {
                matchCount = 0;
                break;
            } else if (columnObjectsArray[j].color === columnObjectsArray[++j].color) {
                matchCount++;
                if (matchCount === connectNumber) {
                    gameOver();
                    return;
                }
            } else {
                matchCount = 0;
                break;
            }
        }
    }
}

//similar to the column check function about this is moving row by row (more specifically left to right) to see if there are any wins
function checkRowWins() {
    rowArray = [];
    var matchCount = 0;

    var previousColor = null;

    for (var r = 0; r < boardSizeRows; r++) {
        for (var i = 0; i < boardDivs.length; i++) {
            if (boardDivs[i].row === r) {
                rowArray.push(boardDivs[i]);
            }
        }
        for (var j = 0; j < rowArray.length; j++) {
            var color = rowArray[j].color;
            if (color !== null && previousColor === color) {
                matchCount++;
                if (matchCount === connectNumber) {
                    gameOver();
                    return color;
                }
            } else {
                matchCount = 0;
            }
            previousColor = color;
        }
    }
}


// Diagonal Win Condition Checks
function checkDiagonalWins(divCol, divRow) {
    var matchCount = 0;
    var currentDivCol = Number(divCol);
    var currentDivRow = Number(divRow);
    var arrayTotal = ((boardSizeRows - 1) * boardSizeColumns);
    var arrayLocator = arrayTotal - (boardSizeRows * divRow);
    var secondArrayLocator = arrayLocator;
    var thirdArrayLocator = arrayLocator;
    var indexOfDiv = arrayLocator + currentDivCol + currentDivRow;

    // Calling the functions for all the diagonal directions
    checkNE();
    if (matchCount === connectNumber) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkNW();
    if (matchCount === connectNumber) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkSE();
    if (matchCount === connectNumber) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkSW();
    if (matchCount === connectNumber) {
        return;
    }

    //Initial check for North East of the Token
    function checkNE() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow++;
            secondArrayLocator -= boardSizeRows;
            continueToCheckNE();
        }
    }

    //Continuing checking North East of the Token
    function continueToCheckNE() {

        if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow++;
            secondArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
                return;
            }
            continueToCheckNE();
        } else if (boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            finalCheckSW();
        }
    }

    //Final Check through North East of Token
    function finalCheckNE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckNE();
        } else {
        }
    }

    //Initial check for South West of Token
    function checkSW() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow--;
            secondArrayLocator += 7;
            continueToCheckSW();
        }
    }

    //Continue checking South West of Token
    function continueToCheckSW() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow--;
            secondArrayLocator += 7;
            if (matchCount === connectNumber) {
                gameOver();
                return;
            }
            continueToCheckSW();
        } else if (boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            finalCheckNE();
        }
    }

    //Final check through South West of Token
    function finalCheckSW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow--;
            thirdArrayLocator += 7;
            if (matchCount === connectNumber) {
                gameOver();
                return;
            }
            finalCheckSW();
        } else {
        }
    }

    //Initial check for North West of Token
    function checkNW() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow++;
            secondArrayLocator -= 7;
            continueToCheckNW();
        }
    }

    //Continue checking North West of Token
    function continueToCheckNW() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow++;
            secondArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
                return;
            }
            continueToCheckNW();
        } else if (boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            finalCheckSE();
        }
    }

    //Final check through North West of Token
    function finalCheckNW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            matchCount++;
            currentDivCol++;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckNW();
        } else {
        }
    }

    //Initial check for South East of Token
    function checkSE() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow--;
            secondArrayLocator += 7;
            continueToCheckSE();
        }
    }

    //Continue checking through South East of Token
    function continueToCheckSE() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color === null) {
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow--;
            secondArrayLocator += 7;
            if (matchCount === connectNumber) {
                gameOver();
                return;
            }
            continueToCheckSE();
        } else if (boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            finalCheckNW();
        }
    }

    //Final check through South East of Token
    function finalCheckSE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            matchCount++;
            currentDivCol--;
            currentDivRow--;
            thirdArrayLocator += 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckSE();
        } else {
        }
    }

    //Finds the number needed to locate tokens
    function findArrayLocator(divRow) {
        for (var i = 1; i <= boardSizeColumns; i++) {
            if (divRow === i) {
                arrayLocator = arrayLocator * i;
                return arrayLocator;
            }
        }
    }
}

//Resets the board for a new game
function resetBoard() {
    boardDivs = [];
    $('.gameboard div').html('');
    createBoard();
    $('.dropTokenHere').click(tokenDrop);
}

//Game ends, winner is announced and resetBoard is called
function gameOver() {
    currentPlayer.changePlayer();
    currentPlayer.changePlayer();
    currentPlayer.wins++;
    boardDivs = [];
    $('.gameboard div').html('');
    var newDiv = $('<div>');
    newDiv.text('PLAYER ' + currentPlayer.color.toUpperCase() + ' WINS!');
    newDiv.css({
        'font-family': 'sans-serif',
        'font-size': '100px',
        'color': 'red',
        'text-align': 'center'
    });
    $('.gameboard').append(newDiv);
    setTimeout(resetBoard, 1500);
}