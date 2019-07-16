import React, { useEffect } from "react";

export function TicTacToeTile(props) {

    const handleClick = (event) => {
        event.preventDefault();
        props.callback(props.index);
    };

    const getClassName = () => {
        let [col, row] = [parseInt(props.index[0]), parseInt(props.index[1])],
            style = "ttt__tile";
        if (col === 1 && row === 1) {
            style = style + " ttt__tile--center";
        } else if (row === 1) {
            if (col === 0 || col === 2) {
                style = style + " ttt__tile--leftright";
            };
        };
        if (props.status === 1) {
            style = style + " ttt__tile--player1";
        } else if (props.status === 2) {
            style = style + " ttt__tile--player2";
        } else if (props.status === 0) {
            if (!props.block) {
                if (props.currentPlayer === 1) {
                    style = style + " ttt__tile--empty-hover-p1";
                } else if (props.currentPlayer === 2) {
                    style = style + " ttt__tile--empty-hover-p2";
                };
            };
        };
        if (props.win) {
            style = style + " ttt__tile--win";
        };
        return style;
    };

    const getContent = () => {
        switch (props.status) {
            case 1:
                return "X";
            case 2:
                return "O";
            default:
                return "";
        };
    }

    return (
        <div className={ getClassName() }
             onClick={ (e) => handleClick(e) }>
             { getContent() }
        </div>
    );
};

TicTacToeTile.defaultProps = {
    id: "",
    currentPlayer: 1,
    block: false,
    index: [0, 0],
    status: 0,
    win: false,
    callback: () => null
};