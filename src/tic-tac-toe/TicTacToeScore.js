import React from "react";

export function TicTacToeScore(props) {

    return (
        <div className="ttt__score">

            <div className={ `ttt__score--player1${props.score[1] > props.score[2] ?
                            " ttt__winning" : ""}` }>
                <span>{ `${props.player1.toUpperCase()}` }</span>
                <span>{ `${props.score[1]}` }</span>
            </div>

            <div className="ttt__score--draws">
                <span>DRAWS</span>
                <span>{ `${props.score[0]}` }</span>
            </div>

            <div className={ `ttt__score--player2${props.score[2] > props.score[1] ?
                            " ttt__winning" : ""}` }>
                <span>{ `${props.player2.toUpperCase()}` }</span>
                <span>{ `${props.score[2]}` }</span>
            </div>

        </div>
    );
};

TicTacToeScore.defaultProps = {
    player1: "Player 1",
    player2: "Player 2",
    score: {
        0: 0,
        1: 0,
        2: 0
    }
};