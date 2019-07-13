import React from "react";

export function EndScreen(props) {

    const handleWinner = (value) => {
        switch (value) {
            case 1:
                return `Player 1 has won`;
            case 2:
                return `Player 2 has won`;
            default:
                return `The game was a draw`;
        };
    };

    return (<>
    <div className="ttt__endgame">
        <span className="ttt__endgame--title">Game has ended!</span>
        <span className="ttt__endgame--victory">{ handleWinner(props.winner) }</span>
        <span className="ttt__endgame--score ttt__endgame--score--title">Score:</span>
        <span className="ttt__endgame--score">{`Player 1: ${props.score.player1}`}</span>
        <span className="ttt__endgame--score">{`Player 2: ${props.score.player2}`}</span>
        <button className="button--grey ttt__endgame--button" onClick={ () => props.action() }>Play Again?</button>
    </div>
    </>)
};

EndScreen.defaultProps = {
    action: () => null,
    score: {player1: 0, player2: 0},
    winner: 0
};