import React, { useState, useEffect, useRef } from "react";
import { ChessTile } from "./ChessTile"
import { ChessScore } from "./ChessScore";
import { generateId } from "../utilities/utilities";

export function ChessMatch(props) {

    const [gameEnd, setGameEnd] = useState({end: false, winner: undefined});

    const [actionsBlocked, setActionsBlocked] = useState(true);

    const [score, setScore] = useState({
        0: 0,
        1: 0,
        2: 0
    });

    const [currentPlayer, setCurrentPlayer] = useState(1);

    const [field, setField] = useState({});

    const [pieceSelected, setPieceSelected] = useState(undefined);

    const [possibleMovements, setPossibleMovements] = useState([])


    useEffect(() => {
        let newField = {},
            blankSpace = true;
        for (let col = 0; col < 8; col++) {
            newField[col] = {};
            for (let row = 0; row < 8; row++) {
                newField[col][row] = {
                    location: [col, row],
                    occupied: undefined,
                    id: generateId(),
                    selected: false,
                    possibleMovement: false,
                    pieceToBeCaptured: false
                };
                if (blankSpace) {
                    newField[col][row].blackTile = row % 2 === 0 ? false : true;
                } else {
                    newField[col][row].blackTile = row % 2 === 0 ? true : false;
                };
            }
            blankSpace = !blankSpace;
        };
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 3; row++) {
                if (newField[col][row].blackTile) {
                    newField[col][row].occupied = {
                        player: 1,
                        id: `tile_${generateId()}`
                    };
                };
            };
            for (let row = 7; row > 4; row--) {
                if (newField[col][row].blackTile) {
                    newField[col][row].occupied = {
                        player: 2,
                        id: `tile_${generateId()}`
                    };
                };
            };
        };
        setField(newField);
        setActionsBlocked(false);
    }, []);

    return (
        <div className="game chess">

            <ChessScore player1={ props.player1 }
                        player2={ props.player2 }
                        { ...score }/>

            <div className="chess__frame">
            {
                Object.keys(field).map( column =>

                    <div className="chess__column"
                         key={ column.toString() }>
                    {
                        Object.keys(field[column]).map( tile =>
                            
                                <ChessTile/>
                        )
                    }
                    </div>
                )
            }
            </div>

        </div>
    );
};