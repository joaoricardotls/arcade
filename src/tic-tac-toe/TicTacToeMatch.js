import React, { useState, useEffect } from "react";
import { generateId, getRandomInt } from "../utilities/utilities";
import { TicTacToeTile } from "./TicTacToeTile";
import { TicTacToeScore } from "./TicTacToeScore";

export function TicTacToeMatch(props) {

    const [gameEnd, setGameEnd] = useState({end: false, winner: undefined});

    const [actionsBlocked, setActionsBlocked] = useState(false);

    const [score, setScore] = useState({
        0 : 0,
        1 : 0,
        2 : 0
    });

    const [currentPlayer, setCurrentPlayer] = useState(1);

    const [field, setField] = useState({});
    
    useEffect(() => {
        let newField = {};
        for (let col = 0; col < 3; col++) {
            newField[col] = {};
            for (let row = 0; row < 3; row++) {
                newField[col][row] = {
                    index: [col, row],
                    status: 0,
                    id: generateId(),
                    win: false
                };
            };
        };
        setField(newField);
    }, []);

    const changeCurrentPlayer = () => {
        setCurrentPlayer(value => value === 1 ? 2 : 1);
    };

    const evaluateWin = (fieldObj) => {
        let possibleWins = [
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                [[0, 0], [1, 1], [2, 2]],
                [[2, 0], [1, 1], [0, 2]]
            ],
            win = 0,
            winList = [];
        for (let i = 0; i < 8; i++) {
            let statusList = [];
            for (let t = 0; t < 3; t++) {
                let [c, r] = [ ...possibleWins[i][t] ];
                statusList.push(fieldObj[c][r].status);
            };
            if (statusList.every(status => status === 1)) {
                win = 1;
                winList = [ ...winList, ...possibleWins[i] ];
            } else if (statusList.every(status => status === 2)) {
                win = 2;
                winList = [ ...winList, ...possibleWins[i] ];
            };
        };
        if (win === 1 || win === 2) {
            return [win, winList];
        } else {
            return [null, null];
        };
    };

    const handleTileClicked = (index) => {
        if (!actionsBlocked) {
            let [col, row] = [ ...index ];
            col = parseInt(col); row = parseInt(row);
            let newField = { ...field };
            if (newField[col][row].status === 0) {
                newField[col][row].status = currentPlayer;
                let [gameWin, winnerTiles] = evaluateWin(newField);
                if (gameWin !== null) {
                    winnerTiles.forEach(index => {
                        let [c, r] = [ ...index ];
                        newField[c][r].win = true;
                    });
                    setField(newField);
                    let newScore = { ...score };
                    newScore[gameWin] += 1;
                    setScore(newScore);
                    setActionsBlocked(true);
                    setTimeout(() => {
                        setGameEnd({
                            end: true,
                            winner: gameWin
                        });
                    }, 2000);
                } else if (Object.keys(newField).every(col => {
                    return Object.keys(newField[col]).every(tile => newField[col][tile].status !== 0)
                })) {
                    let newScore = { ...score };
                    newScore[0] += 1;
                    setScore(newScore);
                    setActionsBlocked(true);
                    setTimeout(() => {
                        setGameEnd({
                            end: true,
                            winner: 0
                        });
                    }, 2000);
                } else {
                    setField(newField);
                    changeCurrentPlayer();
                };
            };
        };
    };

    const handleRematch = (lastWinner) => {
        
        let newField = {};
        for (let col = 0; col < 3; col++) {
            newField[col] = {};
            for (let row = 0; row < 3; row++) {
                newField[col][row] = {
                    index: [col, row],
                    status: 0,
                    id: generateId(),
                    win: false
                };
            };
        };
        setField(newField);
        let nextPlayer = 1;
        switch (lastWinner) {
            case 1:
                nextPlayer = 1;
                break;
            case 2:
                nextPlayer = 2;
                break;
            default:
                nextPlayer = getRandomInt(1, 2);
                break;
        };
        setCurrentPlayer(nextPlayer);
        setCurrentPlayer(lastWinner === 1 ? 1 : 2)
        setActionsBlocked(false);
        setGameEnd({
            end: false,
            winner: undefined
        });
    };

    if (!gameEnd.end) {

        return (
            <div className="game ttt">

                <TicTacToeScore player1={ props.player1 }
                                player2={ props.player2 }
                                score={ score }/>

                <h2 className="title">
                    { currentPlayer === 1 ? props.player1.toUpperCase() : props.player2.toUpperCase() } TURN
                </h2>

                <div className="ttt__frame">
                {
                    Object.keys(field).map(column =>

                        <div className="ttt__column"
                             key={ column.toString().concat(column.toString()) }>
                        {
                            Object.keys(field[column]).map(tile =>

                                <TicTacToeTile { ...field[column][tile] }
                                               key={ field[column][tile].id }
                                               callback={ handleTileClicked }
                                               block={ actionsBlocked }
                                               currentPlayer={ currentPlayer }/>
                            )
                        }
                        </div>
                    )
                }
                </div>

            </div>
        );

    } else {

        const getWinner = (winner) => {
            switch (winner) {
                case 1:
                    return props.player1.toUpperCase() + " WAS THE WINNER";
                case 2:
                    return props.player2.toUpperCase() + " WAS THE WINNER";
                default:
                    return "GAME WAS A TIE";
            }
        }

        return (
            <div className="game ttt">

                <h2 className="title">GAME FINISH</h2>

                <div className="subtitle">{ getWinner(gameEnd.winner) }</div>

                <div>
                    <div>SCORE</div>
                    <div>{`${props.player1.toUpperCase()}: ${score[1]}`}</div>
                    <div>{`${props.player2.toUpperCase()}: ${score[2]}`}</div>
                    <div>{`DRAWS: ${score[0]}`}</div>
                </div>

                <div>
                    <button onClick={ () => handleRematch(gameEnd.winner) }>
                        REMATCH
                    </button>

                    <button onClick={ () => props.restart() }>
                        CHANGE PLAYERS
                    </button>
                </div>

            </div>
        );
    };  
};

TicTacToeMatch.defaultProps = {
    player1: "Player 1",
    player2: "Player 2",
    restart: () => null
};