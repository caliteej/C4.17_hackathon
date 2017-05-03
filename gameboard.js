


var player = {
    One: {
        color: 'red',
    //    function for token drop
    //    check win condition
        changePlayer: function() {
            currentPlayer = player.Two;
        }
    },
    Two: {
        color: 'green',
    //    function for token drop
    //    check win condition
        changePlayer: function() {
            currentPlayer = player.Three;
        }
    },
    Three: {
        color: 'blue',
    //    function for token drop
    //    check win condition
        changePlayer: function() {
            currentPlayer = player.One;
        }
    }
};

var currentPlayer = player.One;

$(document).ready(function(){
    createBoard();
    $('.dropTokenHere').click(tokenDrop);
});

var boardSizeColumns = 6;
var boardSizeRows = 7;

var boardDivs = [];

function createBoard() {

    for (var i = boardSizeRows; i >= 0; i--) {
        var row = i;
        for (var j = 0; j < boardSizeColumns; j++) {
            var column = j;
            var newDiv = $('<div>');
            if(i===boardSizeRows){
                $('body').append(newDiv);
                $(newDiv).css({
                    "background-color":"blue",
                    "height": "100px",
                    "width": "150px",
                    "display": "inline-block",
                    "border": "solid black 1px",
                    "color": "white",
                    "margin": "2px"
                });
                $(newDiv).text('COLUMN ' + column);
                $(newDiv).addClass('dropTokenHere');
                $(newDiv).attr('column', column);
                column++;
            } else {
                $('body').append(newDiv);
                $(newDiv).text('column: ' + column + ' row: ' + row);
                $(newDiv).attr('id', '' + column + row);
                $(newDiv).css({
                    "border-radius": '50%',
                    "border": "1px solid black",
                    'height': '150px',
                    'width': '150px',
                    "display": "inline-block"
                });
                var div = new divCreator();
                div.column = j;
                div.row = i;
                div.open = 'open';
                div.color = null;
                boardDivs.push(div);
                column++;
            }
        }
        $('body').append('<br>');
    }
    function divCreator(){
        var newDiv = {
            column: null,
            row: null,
            tokens: null
        }
    }
}

var columnObjectsArray = [];

//drop token onto the gameboard, find associated div, change token color
function tokenDrop(){
    columnObjectsArray = [];
    var divCol = $(this).attr('column');
    //console.log($(boardDivs).find[divCol]);

    for(var i = 0; i < boardDivs.length; i++){
        if(boardDivs[i].column == divCol){
            columnObjectsArray.push(boardDivs[i]);
        } else {
            // console.log('no columns');
        }
    }
    columnObjectsArray = columnObjectsArray.reverse();
    for(var j = 0; j < columnObjectsArray.length; j++) {
        // console.log(columnObjectsArray[j]);
        if (columnObjectsArray[j].open === 'open') {
            // console.log('open');
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = currentPlayer.color;
            // console.log(currentDiv);
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            //changeColor(columnObjectsArray[i]);
            //checkWinPatterns();
            currentPlayer.changePlayer();
            checkWinPatterns(divCol, j);
            return;
        } else {
            // console.log('nothing open');
        }
    }
}

////////////////////////////

function checkWinPatterns(divCol, divRow){
    // checkColumnWins();
    // checkRowWins();
    checkDiagonalWins(divCol, divRow);
}



///////////////////////////////// - TJ



function checkColumnWins() {
    var matchCount = 0;

    boardDivs.attr('column')
    //add column incrementer
    currentColumn = name(i);
    for (i = 0; i < currentColumn.length; i) {
        if (currentColumn[i] === currentColumn[++i]) {
            console.log('match');
            matchCount++;
        } else {
            console.log('not a match');
            matchCount = 0;
            return false;
        }
        if (matchCount === 4) { //will need to come back and update this to reflect the desired number of matches needed
            console.log('Player ' + currentState + ' has won!');
        }
    }
}











//////////////////////////////// - Anna








function checkRowWins() {
    //currentArray
    for (i = 0; i < currentArray.length; i++) {

        if (columnArrayA[i] === columnArrayB[i]) {
            console.log('match');
            matchCount++;
        }
    }
}












////////////////////////////////////////// - Alex
function checkDiagonalWins(divCol, divRow) {
    var winCounter = 0;
    var currentDivCol = Number(divCol);
    var currentDivRow = Number(divRow);
    var arrayTotal = ((boardSizeRows-1)*boardSizeColumns);
    var arrayLocator = arrayTotal - (boardSizeRows*divRow);
    var secondArrayLocator = arrayLocator;
    var thirdArrayLocator = arrayLocator;
    var indexOfDiv = arrayLocator + currentDivCol + currentDivRow;

    checkNE();
    if(winCounter === 4) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkNW();
    if(winCounter === 4) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkSE();
    if(winCounter === 4) {
        return;
    }
    secondArrayLocator = arrayLocator;
    checkSW();
    if(winCounter === 4) {
        return;
    }

    function checkNE() {
        if (boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color === null) {
            console.log('NE No match!');
        } else if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
            winCounter++;
            currentDivCol--;
            currentDivRow++;
            secondArrayLocator -= boardSizeRows;
            continueToCheckNE();
        }
    }
    function continueToCheckNE() {

        if (boardDivs[indexOfDiv].color === boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
            winCounter++;
            currentDivCol--;
            currentDivRow++;
            secondArrayLocator -= 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
                return;
            }
            continueToCheckNE();
        } else if(boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE No match!');
            finalCheckSW();
        }
    }
    function finalCheckNE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol - 1) + (currentDivRow + 1)].color) {
            console.log('NE Match!');
            winCounter++;
            currentDivCol--;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
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
            winCounter++;
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
            winCounter++;
            currentDivCol++;
            currentDivRow--;
            secondArrayLocator += 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
                return;
            }
            continueToCheckSW();
        } else if(boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            console.log('SW No match!');
            finalCheckNE();
        }
    }
    function finalCheckSW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol + 1) + (currentDivRow - 1)].color) {
            console.log('SW Match!');
            winCounter++;
            currentDivCol++;
            currentDivRow--;
            thirdArrayLocator += 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
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
            winCounter++;
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
            winCounter++;
            currentDivCol++;
            currentDivRow++;
            secondArrayLocator -= 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
                return;
            }
            continueToCheckNW();
        } else if(boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            console.log('NW No match!');
            finalCheckSE();
        }
    }
    function finalCheckNW() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator - boardSizeRows) + (currentDivCol + 1) + (currentDivRow + 1)].color) {
            console.log('NW Match!');
            winCounter++;
            currentDivCol++;
            currentDivRow++;
            thirdArrayLocator -= 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
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
            winCounter++;
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
            winCounter++;
            currentDivCol--;
            currentDivRow--;
            secondArrayLocator += 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
                return;
            }
            continueToCheckSE();
        } else if(boardDivs[indexOfDiv].color !== boardDivs[(secondArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            console.log('SE No match!');
            finalCheckNW();
        }
    }
    function finalCheckSE() {
        if (boardDivs[indexOfDiv].color === boardDivs[(thirdArrayLocator + boardSizeRows) + (currentDivCol - 1) + (currentDivRow - 1)].color) {
            console.log('SE Match!');
            winCounter++;
            currentDivCol--;
            currentDivRow--;
            thirdArrayLocator += 7;
            if(winCounter === 3) {
                alert('4 in a row! WIN!!');
            }
            finalCheckSE();
        } else {
            console.log('SW No match!');
        }
    }
}
function findArrayLocator(divRow) {
    for(var i = 1; i <= boardSizeColumns; i++) {
        if(divRow === i) {
            arrayLocator = arrayLocator * i;
            return arrayLocator;
        } else {
            arrayLocator -= 7;
        }
    }
}