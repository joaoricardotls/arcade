import React, { useState, useEffect, useRef } from "react";
import { Tile } from "./Tile"
import { generateId } from "../utilities/utilities";
import { CheckersScore } from "./CheckersScore";
import { type } from "os";

export function CheckersMatch(props) {

    const [gameEnd, setGameEnd] = useState({end: false, winner: undefined});

    const [actionsBlocked, setActionsBlocked] = useState(false);

    const [score, setScore] = useState({
        0: 0,
        1: 0,
        2: 0
    });

    const [currentPlayer, setCurrentPlayer] = useState(1);

    const [field, setField] = useState({});

    const [pieceSelected, setPieceSelected] = useState(undefined);




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
                    mandatoryMovement: false
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
                        queen: false,
                        id: `tile_${generateId()}`
                    };
                };
            };
            for (let row = 7; row > 4; row--) {
                if (newField[col][row].blackTile) {
                    newField[col][row].occupied = {
                        player: 2,
                        queen: false,
                        id: `tile_${generateId()}`
                    };
                };
            };
        };
        setField(newField);
    }, [])


    const revealPossibleMovements = (fieldObj, index) => {

        let newField = { ...fieldObj };

        for (let c = 0; c < 8; c++) {
            for (let r = 0; r < 8; r++) {
                if (newField[c][r].selected) {
                    let cornersList = [
                        [c - 1, r - 1],
                        [c + 1, r - 1],
                        [c - 1, r + 1],
                        [c + 1, r + 1]
                    ];
                    cornersList.forEach(index => {
                        let [col, row] = [...index];
                        try {
                            if (newField[col][row].occupied === undefined) {
                                newField[col][row].possibleMovement = true;
                            } else {
                                if (newField[col][row].occupied.player !== currentPlayer) {
                                    // STOPPED HERE, TRYING TO EAT THE OPPONENT'S PIECES
                                    console.log("I'm done for today..")
                                };
                            };
                        } catch {};
                    });
                };
            };
        };

        return newField;
    };

    const cleanSelectedTile = (fieldObj) => {
        let newField = { ...fieldObj };
        Object.keys(newField).forEach( column => {
            Object.keys(newField[column]).forEach( tile => {
                newField[column][tile].selected = false;
                newField[column][tile].possibleMovement = false;
                newField[column][tile].mandatoryMovement = false;
            });
        });
        return newField;
    };







    const handleClick = (index) => {
        if (!actionsBlocked) {
            let [col, row] = [...index],
                newField = { ...field }
            if (pieceSelected === undefined) {
                if (newField[col][row].occupied !== undefined &&
                    newField[col][row].occupied.player === currentPlayer) {
                    newField[col][row].selected = true;
                    newField = revealPossibleMovements(newField, [col, row]);
                    setField(newField);
                    setPieceSelected([col, row]);
                };
            } else {
                if (newField[col][row].selected) {
                    newField = cleanSelectedTile(newField);
                    setField(newField);
                    setPieceSelected(undefined);
                } else if (newField[col][row].possibleMovement) {
                    let [sc, sr] = [ ...pieceSelected ];
                    let movingPiece = { ...newField[sc][sr].occupied };
                    newField[sc][sr].occupied = undefined;
                    newField[col][row].occupied = movingPiece;
                    newField = cleanSelectedTile(newField);
                    setField(newField);
                    setPieceSelected(undefined);
                    setCurrentPlayer( player => player === 1 ? 2 : 1);
                };
            };
        };
    };

    return (<>
        <div className="game checkers">

            <CheckersScore player1={ props.player1 }
                           player2={ props.player2 }
                           { ...score }/>

            <div className="checkers__frame">
            {
                Object.keys(field).map( column =>

                    <div className="checkers__column"
                         key={ column.toString() }>
                    {
                        Object.keys(field[column]).map( tile =>
                            
                                <Tile { ...field[column][tile] }
                                      key={ field[column][tile].id }
                                      handleClick={ handleClick }/>
                        )
                    }
                    </div>
                )
            }
            </div>

        </div>
    </>);
};