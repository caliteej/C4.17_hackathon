
$(document).ready(function(){
    createBoard();
})

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


