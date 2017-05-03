


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

    for(var j = 0; j < columnObjectsArray.length; j++) {
        columnObjectsArray = columnObjectsArray.reverse();
        console.log(columnObjectsArray[j]);
        if (columnObjectsArray[j].open === 'open') {
            console.log('open');
            var currentDiv = columnObjectsArray[j];
            currentDiv.open = 'closed';
            currentDiv.color = 'blue';
            console.log(currentDiv);
            var id = '#' + divCol + j;
            $(id).css({'background-color': currentPlayer.color});
            //changeColor(columnObjectsArray[i]);
            //checkWinPatterns();
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



///////////////////////////////// - TJ



function checkColumnWins() {
    var matchCount = 0;
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

function checkDiagonalWins() {}
