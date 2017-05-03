


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
//sets board size and array for divs created
var boardSizeColumns = 6;
var boardSizeRows = 7;
var boardDivs = [];
//creates the board sets css styling and creates objects attached to each div
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
            console.log('no columns');
        }
    }
    columnObjectsArray = columnObjectsArray.reverse();
    for(var j = 0; j < columnObjectsArray.length; j++) {
        console.log(columnObjectsArray[j]);
        if (columnObjectsArray[j].open === 'open') {
            console.log('open');
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = currentPlayer.color;
            console.log(currentDiv);
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            //changeColor(columnObjectsArray[i]);
            checkWinPatterns();
            currentPlayer.changePlayer();
            return;
        } else {
            console.log('nothing open');
        }
    }
}

////////////////////////////

function checkWinPatterns(){
    checkColumnWins();
    checkRowWins();
    checkDiagonalWins();
}

// ///////////////////////////////// - TJ




































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
                if (matchCount === 2) {
                    console.log('you win');
                    return color;
                }
            } else {
                matchCount = 0;
            }
            previousColor = color;
        }
    }
}












//
// ////////////////////////////////////////// - Alex

