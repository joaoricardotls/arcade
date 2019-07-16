import React, { useState, useEffect, useRef } from "react";
import { Tile } from "./Tile"
import { generateId } from "../utilities/utilities";
import { CheckersScore } from "./CheckersScore";
import { type } from "os";
import { get } from "https";

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

    const [pieceSelected, setPieceSelected] = useState({
        selected: undefined,
        possibleCaptures: undefined
    });




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
                    mandatoryMovement: false,
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
        // Accepts 0 (nw), 1 (ne), 2 (se), 3 (sw) and the counter to the distance
        const getDiagonalIndex = (initIndex, direction, count) => {
            let cornersList = [
                [initIndex[0] - count, initIndex[1] - count],
                [initIndex[0] + count, initIndex[1] - count],
                [initIndex[0] - count, initIndex[1] + count],
                [initIndex[0] + count, initIndex[1] + count]
            ];
            return cornersList[direction]
        };
        let possibleMovementsList = [],
            possibleCapturesList = [];
        for (let i = 0; i < 4; i++) {
            let [c, r] = [ ...getDiagonalIndex(index, i, 1) ];
            try {
                if (newField[c][r].occupied === undefined) {
                    possibleMovementsList.push([c, r]);
                } else if (newField[c][r].occupied !== undefined &&
                        typeof newField[c][r].occupied === "object" &&
                        newField[c][r].occupied.player !== currentPlayer) {
                    let [c2, r2] = [...getDiagonalIndex(index, i, 2)];
                    if (newField[c2][r2].occupied === undefined) {
                        // This list has the index of the piece to be captured and the final position of the captor piece
                        possibleCapturesList.push([
                            [c, r],
                            [c2, r2]
                        ]);
                    };
                };
            } catch {};
        };
        if (possibleCapturesList.length > 0) {
            possibleCapturesList.forEach( array => {
                let [c1, r1] = [ ...array[0] ],
                    [c2, r2] = [ ...array[1] ];
                newField[c1][r1].pieceToBeCaptured = true;
                newField[c2][r2].mandatoryMovement = true;
            });
        } else {
            possibleMovementsList.forEach( possible => {
                let [c, r] = [ ...possible ];
                newField[c][r].possibleMovement = true;
            });
        };
        return [newField, possibleCapturesList];
    };

    const cleanSelectedTile = (fieldObj) => {
        let newField = { ...fieldObj };
        Object.keys(newField).forEach( column => {
            Object.keys(newField[column]).forEach( tile => {
                newField[column][tile].selected = false;
                newField[column][tile].possibleMovement = false;
                newField[column][tile].mandatoryMovement = false;
                newField[column][tile].pieceToBeCaptured = false;
            });
        });
        return newField;
    };







    const handleClick = (index) => {
        if (!actionsBlocked) {
            let [col, row] = [...index],
                newField = { ...field }
            if (pieceSelected.selected === undefined) {
                if (newField[col][row].occupied !== undefined &&
                    newField[col][row].occupied.player === currentPlayer) {
                    newField[col][row].selected = true;
                    let possibleCaptures;
                    [newField, possibleCaptures] = revealPossibleMovements(newField, [col, row]);
                    console.log(possibleCaptures);
                    setField(newField);
                    setPieceSelected({
                        selected: [col, row],
                        possibleCaptures: possibleCaptures
                    });
                };
            } else {
                if (newField[col][row].selected) {
                    newField = cleanSelectedTile(newField);
                    setField(newField);
                    setPieceSelected({
                        selected: undefined,
                        possibleCaptures: undefined
                    });
                } else if (newField[col][row].possibleMovement) {
                    let [sc, sr] = [ ...pieceSelected.selected ];
                    let movingPiece = { ...newField[sc][sr].occupied };
                    newField[sc][sr].occupied = undefined;
                    newField[col][row].occupied = movingPiece;
                    newField = cleanSelectedTile(newField);
                    setField(newField);
                    setPieceSelected({
                        selected: undefined,
                        possibleCaptures: undefined
                    });
                    setCurrentPlayer( player => player === 1 ? 2 : 1);
                } else if (newField[col][row].mandatoryMovement) {
                    pieceSelected.possibleCaptures.forEach( array => {
                        if (col === array[1][0] && row === array[1][1]) {
                            let [sc, sr] = [ ...pieceSelected.selected ],
                                movingPiece = { ...newField[sc][sr].occupied };
                            newField[sc][sr].occupied = undefined;
                            newField[array[0][0]][array[0][1]].occupied = undefined;
                            newField[col][row].occupied = movingPiece;
                        };
                    });
                    newField = cleanSelectedTile(newField);
                    setField(newField);
                    setPieceSelected({
                        selected: undefined,
                        possibleCaptures: undefined
                    });
                    setCurrentPlayer(player => player === 1 ? 2 : 1);
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