/**
 * Created by timothykinion on 5/2/17.
 */


var currentDiv = //whatever div/array is clicked to drop the token into

function tokenDrop() {
    $(this).arrayName.push(currentPLayer.color);
    $('#divCounter').findClass('currentDivClass').style('background-color', currentPLayer.color);

    $(currentDiv).find().attr('row')
    currentDiv.divCounter++; //update div id #;
}

function checkWinPatterns(){
    checkColumnWins();
    checkRowWins();
    checkDiagonalWins();
}

function checkColumnWins() {
    var matchCount = 0;
    //add column incrementer
    currentColumn = name(i)
    for(i = 0; i < currentColumn.length; i){
        if(currentColumn[i] === currentColumn[++i]) {
            console.log('match');
            matchCount++;
        } else {
            console.log('not a match');
            matchCount = 0;
            return false;
        }
        if(matchCount === 4) { //will need to come back and update this to reflect the desired number of matches needed
            console.log('Player ' + currentState + ' has won!');
        }
    }
}

function checkRowWins(){
    currentArray =

    for(i = 0; i < currentArray.length; i++){

        if(columnArrayA[i] === columnArrayB[i]){
            console.log('match');
            matchCount++;
        }
    }
}