
var currentPlayer = player.One;

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


$(document).ready(function(){
    createBoard();
});

var boardSizeColumns = 6;
var boardSizeRows = 7;

var boardDivs = [];

function createBoard() {

    for (var i = 0; i <= boardSizeRows; i++) {
        var row = i;
        for (var j = 0; j < boardSizeColumns; j++) {
            var column = j;
            var newDiv = $('<div>');
            if(i===0){
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
                column++;
            } else {
                $('body').append(newDiv);
                $(newDiv).text('column: ' + column + ' row: ' + row);
                $(newDiv).css({
                    "border-radius": '50%',
                    "border": "1px solid black",
                    'height': '150px',
                    'width': '150px',
                    "display": "inline-block"
                });
                var div= new divCreator();
                div.column = j;
                div.row = i;

                boardDivs.push(div);
                column++;
                row++;
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


var currentDiv = //whatever div/array is clicked to drop the token into

function tokenDrop() {
    $(this).arrayName.push(currentPLayer.color);
    $('#divCounter').findClass('currentDivClass').style('background-color', currentPLayer.color);

    $(currentDiv).find().attr('row');
    currentDiv.divCounter++; //update div id #;
};

function checkWinPatterns(){
    checkColumnWins();
    checkRowWins();
    checkDiagonalWins();
}

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

function checkRowWins() {
    //currentArray
    for (i = 0; i < currentArray.length; i++) {

        if (columnArrayA[i] === columnArrayB[i]) {
            console.log('match');
            matchCount++;
        }
    }
}
