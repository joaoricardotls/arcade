import React, { useState, useEffect } from "react";

export function MonopolyMatch(props) {

    const [board, setBoard] = useState({});



    const hardCodedBoard = {
        0: {
            name: "Start",
            players: [],
        },
        1: {
            name: "York Streek",
            players: [],
        },
        2: {
            name: "Jazz Avenue",
            players: [],
        }
    };






    useEffect(() => {
        let newBoard = { ...hardCodedBoard };
        setBoard(newBoard);
    }, [])






    return (
        <div className="game monopoly">
        {
            Object.keys(board).map( key =>

                <div>{ board[key].name }</div>
            )
        }
        </div>
    );
};