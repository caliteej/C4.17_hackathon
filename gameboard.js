


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
            if (i === boardSizeRows) {
                $('.dropspot').append(newDiv);
                $(newDiv).css({
                    "background-color": "blue",
                    "height": "10vmin",
                    "width": "15vmin",
                    "display": "inline-block",
                    "border": "solid black 1px",
                    "color": "white",
                    "margin": "2px"
                });
                $(newDiv).text('COLUMN ' + column);
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
        $(rowDiv).css({
            "border": "black solid 1px"
        });
        for (var col = 0; col < boardSizeColumns; col++) {
            var column = col;
            var colDiv = $('<div>');
            $(rowDiv).append(colDiv);
            $(colDiv).text('column: ' + column + ' row: ' + row);
            $(colDiv).attr('id', '' + column + row);
            $(colDiv).addClass('tokenHolder');
            $(colDiv).css({
                "border-radius": '50%',
                "border": "1px solid black",
                'height': '12vmin',
                'width': '12vmin',
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
            //console.log('no columns');
        }
    }
    columnObjectsArray = columnObjectsArray.reverse();
    for(var j = 0; j < columnObjectsArray.length; j++) {
        //console.log(columnObjectsArray[j]);
        if (columnObjectsArray[j].open === 'open') {
            console.log('open');
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = currentPlayer.color;
            console.log(currentDiv);
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            //changeColor(columnObjectsArray[i]);
            //checkWinPatterns();
            currentPlayer.changePlayer();
            checkWinPatterns();
            return;
        } else {
            console.log('nothing open');
        }
    }
}

////////////////////////////

function checkWinPatterns(){
    checkColumnWins();
    //checkRowWins();
    //checkDiagonalWins();
}



///////////////////////////////// - TJ



function checkColumnWins() {
    var matchCount = 0;

    var currentColumn = 0;

    columnObjectsArray = [];

    for(var col = 0; col < boardSizeColumns; col++) {
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
            if (columnObjectsArray[j].color === null) {
                matchCount = 0;
                break;
            } else if (columnObjectsArray[j].color === columnObjectsArray[++j].color) {
                matchCount++;
                console.log('its a match');
                if (matchCount === 3) {
                    alert('You won!');
                    return;
                }
            } else {
                matchCount = 0;
                console.log('no matches');
            }
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

function checkDiagonalWins() {}
