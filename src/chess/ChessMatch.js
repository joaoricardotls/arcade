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
    }, [])




    useEffect(() => {
        if (!actionsBlocked) {

            let hasBeenChanged = false,
                newField = { ...field };

            let player1FarthestTiles = [
                [0, 7], [2, 7], [4, 7], [6, 7]
            ];

            let player2FarthestTiles = [
                [1, 0], [3, 0], [5, 0], [7, 0]
            ];

            player1FarthestTiles.forEach( index => {
                let [c, r] = [ ...index ];
                if (newField[c][r].occupied !== undefined && newField[c][r].occupied.player === 1) {
                    if (newField[c][r].occupied.queen === false) {
                        newField[c][r].occupied.queen = true;
                        hasBeenChanged = true;
                    };
                };
            })

            player2FarthestTiles.forEach(index => {
                let [c, r] = [...index];
                if (newField[c][r].occupied !== undefined && newField[c][r].occupied.player === 2) {
                    if (newField[c][r].occupied.queen === false) {
                        newField[c][r].occupied.queen = true;
                        hasBeenChanged = true;
                    };
                };
            })

            if (hasBeenChanged) {
                setField(newField);
            };

            let [newMandatory, newMovements] = getPossibleMovements(newField, currentPlayer);
            console.log(newMandatory);
            console.log(newMovements);
            setPossibleMovements(newMovements);
        };
    }, [field]);





    const getQueensDiagonals = (initIndex, direction, count) => {
        let cornersList = [
            [initIndex[0] - count, initIndex[1] - count],
            [initIndex[0] + count, initIndex[1] - count],
            [initIndex[0] - count, initIndex[1] + count],
            [initIndex[0] + count, initIndex[1] + count]
        ];
        return cornersList[direction]
    };

    const getPlayer1ForwardDiagonals = (initIndex, direction, count) => {
        let cornersList = [
            [initIndex[0] - count, initIndex[1] + count],
            [initIndex[0] + count, initIndex[1] + count]
        ];
        return cornersList[direction]
    };


    const getPlayer2ForwardDiagonals = (initIndex, direction, count) => {
        let cornersList = [
            [initIndex[0] - count, initIndex[1] - count],
            [initIndex[0] + count, initIndex[1] - count],
        ];
        return cornersList[direction]
    };



    const getPossibleMovements = (fieldObj, player) => {
        let possibleCapturesList = [],
            possibleMovementsList = [];
        for (let c = 0; c < 8; c++) {
            for (let r = 0; r < 8; r++) {
                if (fieldObj[c][r].occupied !== undefined &&
                    typeof fieldObj[c][r].occupied === "object" &&
                    fieldObj[c][r].occupied.player === player) {

                    if (fieldObj[c][r].occupied.queen) {
                        
                        for (let i = 0; i < 4; i++) {

                            let [c1, r1] = [ ...getQueensDiagonals([c, r], i, 1) ];

                            try {

                                if (fieldObj[c1][r1].occupied === undefined) {
                                    possibleMovementsList.push([
                                        // [0]: Index of the original piece
                                        [c, r],
                                        // [1]: Index of the final position
                                        [c1, r1]
                                    ]);
                                };

                            } catch { };

                            try {
                                if (fieldObj[c1][r1].occupied !== undefined &&
                                    typeof fieldObj[c1][r1].occupied === "object" &&
                                    fieldObj[c1][r1].occupied.player !== currentPlayer) {

                                    let [c2, r2] = [...getQueensDiagonals([c, r], i, 2)];

                                    if (fieldObj[c2][r2].occupied === undefined) {
                                        possibleCapturesList.push([
                                            // [0]: Index of the original piece that has a capture possibility
                                            [c, r],
                                            // [1]: Index of the piece to be captured
                                            [c1, r1],
                                            // [2]: Index of the final position that the original piece will occupy
                                            [c2, r2]
                                        ]);
                                    };
                                };
                            } catch { };
                        };
                        
                    } else {

                        for (let i = 0; i < 2; i++) {

                            let [c1, r1] = player === 1 ?
                                           [...getPlayer1ForwardDiagonals([c, r], i, 1)] :
                                           [...getPlayer2ForwardDiagonals([c, r], i, 1)];
                            try {
                                if (fieldObj[c1][r1].occupied === undefined) {
                                    possibleMovementsList.push([
                                        // [0]: Index of the original piece
                                        [c, r],
                                        // [1]: Index of the final position
                                        [c1, r1]
                                    ]);
                                };
                            } catch {};
                            try {
                                if (fieldObj[c1][r1].occupied !== undefined &&
                                    typeof fieldObj[c1][r1].occupied === "object" &&
                                    fieldObj[c1][r1].occupied.player !== currentPlayer) {

                                    let [c2, r2] = player === 1 ?
                                                   [...getPlayer1ForwardDiagonals([c, r], i, 2)] :
                                                   [...getPlayer2ForwardDiagonals([c, r], i, 2)];

                                    if (fieldObj[c2][r2].occupied === undefined) {
                                        possibleCapturesList.push([
                                            // [0]: Index of the original piece that has a capture possibility
                                            [c, r],
                                            // [1]: Index of the piece to be captured
                                            [c1, r1],
                                            // [2]: Index of the final position that the original piece will occupy
                                            [c2, r2]
                                        ]);
                                    };
                                };
                            } catch {};
                        };
                    };
                };        
            };
        };
        return [possibleCapturesList, possibleMovementsList];
    };


    const cleanField = (fieldObj) => {
        let newField = {
            ...fieldObj
        };
        Object.keys(newField).forEach(column => {
            Object.keys(newField[column]).forEach(tile => {
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
                newField = { ...field };
            
            if (pieceSelected === undefined) {
                if (newField[col][row].occupied !== undefined &&
                    newField[col][row].occupied.player === currentPlayer) {
                    let flag = false;
                    possibleMovements.forEach( array => {
                        let [c1, r1] = [ ...array[0] ];
                        let [c2, r2] = [ ...array[1] ];
                        if (col === c1 && row === r1) {
                            newField[c2][r2].possibleMovement = true;
                            flag = true;
                        };
                    });
                    if (flag) {
                        newField[col][row].selected = true;
                        setField(newField);
                        setPieceSelected([col, row]);
                    };
                };
            } else if (col === pieceSelected[0] && row === pieceSelected[1]) {
                possibleMovements.forEach( array => {
                    let [c1, r1] = [...array[0]];
                    let [c2, r2] = [...array[1]];
                    if (col === c1 && row === r1) {
                        newField[c2][r2].possibleMovement = false;
                    };
                });
                newField[col][row].selected = false;
                setField(newField);
                setPieceSelected(undefined);
            } else if (newField[col][row].possibleMovement) {
                let [sc, sr] = [ ...pieceSelected ];
                newField[sc][sr].selected = false;
                possibleMovements.forEach(array => {
                    let [c1, r1] = [...array[0]];
                    let [c2, r2] = [...array[1]];
                    if (sc === c1 && sr === r1) {
                        newField[c2][r2].possibleMovement = false
                        if (col === c2 && row === r2) {
                            let movingPiece = { ...newField[sc][sr].occupied };
                            newField[c2][r2].occupied = movingPiece;
                            newField[sc][sr].occupied = undefined;
                        };
                    };
                });
                setField(newField);
                setPieceSelected(undefined);
                setCurrentPlayer(player => player === 1 ? 2 : 1);
            };
        };
    };

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
                            
                                <ChessTile { ...field[column][tile] }
                                      key={ field[column][tile].id }
                                      handleClick={ handleClick }/>
                        )
                    }
                    </div>
                )
            }
            </div>

        </div>
    );
};