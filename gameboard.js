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
                    // "margin": "2px"
                });
                $(newDiv).text('Token Slot ' + column);
                $(newDiv).addClass('dropTokenHere');
                $(newDiv).attr('column', column);
                column++;
            }
        }
    }

    for (var k = boardSizeRows-1; k >= 0; k--) {
        var row = k;
        var rowDiv = $('<div>');
        $('.tokenspot').append(rowDiv);
        for (var col = 0; col < boardSizeColumns; col++) {
            var column = col;
            var colDiv = $('<div>');
            $(rowDiv).append(colDiv);
            //$(colDiv).text('column: ' + column + ' row: ' + row);
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


//drop token onto the gameboard, find associated div, change token color
function tokenDrop(){
    columnObjectsArray = [];
    var divCol = $(this).attr('column');
    console.log(divCol);
    console.log($(boardDivs).find[divCol]);

    for(var i = 0; i < boardDivs.length; i++){
        if(boardDivs[i].column == divCol){
            columnObjectsArray.push(boardDivs[i]);
        } else {
        }
    }
    columnObjectsArray = columnObjectsArray.reverse();
    for(var j = 0; j < columnObjectsArray.length; j++) {
        if (columnObjectsArray[j].open === 'open') {
            // console.log('open');
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = currentPlayer.color;
            // console.log(currentDiv);
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            currentPlayer.changePlayer();
            checkWinPatterns(divCol, j);
            return;
        } else {
            // console.log('nothing open');
        }
    }
}

////////////////////////////

function checkWinPatterns(divCol, divRow) {
    checkColumnWins();
    checkRowWins();
    checkDiagonalWins(divCol, divRow);
}


///////////////////////////////// - TJ


    function checkColumnWins() {
        var matchCount = 0;

        var currentColumn = 0;

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
            //loop through new array
            for (var j = 0; j < columnObjectsArray.length; j) {
                for (n = 0; n < columnObjectsArray.length; n++) {
                    while (columnObjectsArray[n].color !== null) {
                        if (columnObjectsArray[n].color !== columnObjectsArray[n + 1].color && columnObjectsArray[n].color !== columnObjectsArray[n + 2].color && columnObjectsArray[n + 1].color !== columnObjectsArray[n + 2].color &&columnObjectsArray[n+2].color !== null) {
                            alert ('Double Rainbow All the Way....Wow....Wow');
                            break;
                        } else {
                            console.log('no rainbow');
                            break;
                        }
                    }
                }
                if (columnObjectsArray[j].color === null) {
                    matchCount = 0;
                    break;
                } else if (columnObjectsArray[j].color === columnObjectsArray[++j].color) {
                    matchCount++;
                    console.log('its a match');
                    if (matchCount === connectNumber) {
                        gameOver();
                        return;
                    }
                } else {
                    matchCount = 0;
                    console.log('no matches');
                    break;
                }
            }
        }
    }


//////////////////////////////// - Anna

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


////////////////////////////////////////// - Alex
function checkDiagonalWins(divCol, divRow) {
    var matchCount = 0;
    var currentDivCol = Number(divCol);
    var currentDivRow = Number(divRow);
    var arrayTotal = ((boardSizeRows - 1) * boardSizeColumns);
    var arrayLocator = arrayTotal - (boardSizeRows * divRow);
    var secondArrayLocator = arrayLocator;
    var thirdArrayLocator = arrayLocator;
    var indexOfDiv = arrayLocator + currentDivCol + currentDivRow;

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

    function checkNE() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color === null) {
            console.log('NE No match!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
            matchCount++;
            currentDivCol--;
            currentDivRow++;
            secondArrayLocator -= boardSizeRows;
            continueToCheckNE();
        }
    }

    function continueToCheckNE() {

        if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
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
            console.log('NE No match!');
            finalCheckSW();
        }
    }

    function finalCheckNE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
            matchCount++;
            currentDivCol--;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckNE();
        } else {
            console.log('SW No match!');
        }
    }

    function checkSW() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color === null) {
            console.log('SW No match!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            console.log('SW Match!');
            matchCount++;
            currentDivCol++;
            currentDivRow--;
            secondArrayLocator += 7;
            continueToCheckSW();
        }
    }

    function continueToCheckSW() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color === null) {
            console.log('Nothing there?!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            console.log('SW Match!');
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
            console.log('SW No match!');
            finalCheckNE();
        }
    }

    function finalCheckSW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            console.log('SW Match!');
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
            console.log('SW No match!');
        }
    }

    function checkNW() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color === null) {
            console.log('NW No match!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            console.log('NW Match!');
            matchCount++;
            currentDivCol++;
            currentDivRow++;
            secondArrayLocator -= 7;
            continueToCheckNW();
        }
    }

    function continueToCheckNW() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color === null) {
            console.log('Nothing there?!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            console.log('NW Match!');
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
            console.log('NW No match!');
            finalCheckSE();
        }
    }

    function finalCheckNW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            console.log('NW Match!');
            matchCount++;
            currentDivCol++;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckNW();
        } else {
            console.log('SW No match!');
        }
    }

    function checkSE() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color === null) {
            console.log('SE No match!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            console.log('SE Match!');
            matchCount++;
            currentDivCol--;
            currentDivRow--;
            secondArrayLocator += 7;
            continueToCheckSE();
        }
    }

    function continueToCheckSE() {
        if (boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color === null) {
            console.log('Nothing there?!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            console.log('SE Match!');
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
            console.log('SE No match!');
            finalCheckNW();
        }
    }

    function finalCheckSE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            console.log('SE Match!');
            matchCount++;
            currentDivCol--;
            currentDivRow--;
            thirdArrayLocator += 7;
            if (matchCount === connectNumber) {
                gameOver();
            }
            finalCheckSE();
        } else {
            console.log('SW No match!');
        }
    }

    function findArrayLocator(divRow) {
        for (var i = 1; i <= boardSizeColumns; i++) {
            if (divRow === i) {
                arrayLocator = arrayLocator * i;
                return arrayLocator;
            }
        }
    }
}

function resetBoard() {
    boardDivs = [];
    $('.gameboard div').html('');
    createBoard();
    $('.dropTokenHere').click(tokenDrop);
}

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