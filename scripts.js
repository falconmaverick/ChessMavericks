const board = ChessBoard('game-board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
});

// Initialize the Chessboard
function onDragStart (piece, source, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
}

function makeBestMove () {
    const bestMove = getBestMove(game);
    game.move(bestMove);
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
}

function onDrop (source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // always promote to a queen for example
    });
    removeGreySquares();
    renderMoveHistory(game.history());
    if (move === null) return 'snapback';
    if (game.game_over()) alert('Game over');
}

function onMouseoutSquare(square, piece) {
    removeGreySquares();
}

function onMouseoverSquare(square, piece) {
    const moves = game.moves({
        square: square,
        verbose: true
    });
    if (moves.length === 0) return;
    greySquare(square);
    for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
}

function removeGreySquares () {
    $('#game-board .square-55d63').css('background', '');
}

function greySquare (square) {
    const squareEl = $('#game-board .square-' + square);
    const background = '#a9a9a9';
    squareEl.css('background', background);
}

function renderMoveHistory (moves) {
    let moveHistoryElement = $('#move-history').empty();
    for (let i = 0; i < moves.length; i++) {
        moveHistoryElement.append('<span>' + moves[i] + '</span><br>')
    }
    moveHistoryElement.scrollTop(moveHistoryElement[0].scrollHeight);
}

function onSnapEnd () {
    board.position(game.fen());
}

// Restart the game
document.getElementById('restart-btn').addEventListener('click', () => {
    game.reset();
    board.position('start');
    renderMoveHistory(game.history());
});

// Show next move
document.getElementById('next-move-btn').addEventListener('click', makeBestMove);

// Chess logic to calculate the best move
function getBestMove(game) {
    // This is a placeholder function.
    // You should integrate a chess engine here or implement your own logic
    return game.ugly_moves()[0];
}
