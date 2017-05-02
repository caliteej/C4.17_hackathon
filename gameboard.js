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