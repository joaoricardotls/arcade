import React, { useState, useEffect } from "react";
import { generateId } from "../utilities/utilities";

export function ConnectFourMatch(props) {

    const [endGame, setEndGame] = useState({end: false, winner: undefined});

    const [actionsBlocked, setActionsBlocked] = useState(false);

    const [playersScore, setPlayersScore] = useState({
        1: {name: props.player1.toUpperCase(), score: 0},
        2: {name: props.player2.toUpperCase(), score: 0}
    });

    const [currentPlayer, setCurrentPlayer] = useState(2);

    const [columnsObject, setColumnsObject] = useState({
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
    });

    useEffect(() => {
        let lastPlayer = currentPlayer === 1 ? 2 : 1;
        if (evaluateWin(currentPlayer, columnsObject)) {
            setActionsBlocked(true);
            setTimeout(() => {
                setPlayersScore((obj) => {
                    return {
                        ...obj,
                        [currentPlayer]: {
                            name: obj[currentPlayer].name,
                            score: obj[currentPlayer].score + 1
                        }
                    };
                });
                setEndGame({end: true, winner: currentPlayer});
            }, 700);
        } else if (Object.keys(columnsObject).every( key => columnsObject[key].length === 6)) {
            setEndGame({end: true, winner: 0});
        } else {
            changeCurrentPlayer()
        }
    }, [columnsObject]);

    const changeCurrentPlayer = () => {
        if (currentPlayer === 1) {
            setCurrentPlayer(2);
        } else {
            setCurrentPlayer(1);
        };
    };

    const evaluateWin = (player, evalObj) => {
        let arr = Object.keys(evalObj);
        let obj = {};
        for (let q = 0; q < arr.length; q++) {
            let tokens = [];
            for (let p = 0; p < evalObj[q].length; p++) {
                tokens.push(evalObj[q][p].token);
            };
            obj[q] = tokens;
        };
        for (let i = 0; i < 7; i++) {
            for (let r = 0; r < 3; r++) {
                try {
                    let column = [
                        obj[arr[i]][r],
                        obj[arr[i]][r + 1],
                        obj[arr[i]][r + 2],
                        obj[arr[i]][r + 3]
                    ];
                    if (column.every(item => item === player)) return true;
                } catch { };
            };
            for (let j = 0; j < 4; j++) {
                try {
                    let row = [
                        obj[arr[j]][i],
                        obj[arr[j + 1]][i],
                        obj[arr[j + 2]][i],
                        obj[arr[j + 3]][i]
                    ];
                    if (row.every(item => item === player)) return true;
                } catch { };
            };
        };
        for (let k = 0; k < 4; k++) {
            for (let y = 0; y < 3; y++) {
                try {
                    let upperDiagonal = [
                        obj[arr[k]][y],
                        obj[arr[k + 1]][y + 1],
                        obj[arr[k + 2]][y + 2],
                        obj[arr[k + 3]][y + 3]
                    ];
                    if (upperDiagonal.every(item => item === player)) return true;
                } catch { };
            };
            for (let h = 5; h > 2; h--) {
                try {
                    let lowerDiagonal = [
                        obj[arr[k]][h],
                        obj[arr[k + 1]][h - 1],
                        obj[arr[k + 2]][h - 2],
                        obj[arr[k + 3]][h - 3]
                    ];
                    if (lowerDiagonal.every(item => item === player)) return true;
                } catch { };
            };
        };
        return false;
    };

    const restartMatch = () => {
        setEndGame({ end: false, winner: undefined });
        setActionsBlocked(false);
        setCurrentPlayer(2);
        setColumnsObject({
            0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
        });
    }

    const handleColumnClicked = (key) => {
        if (!actionsBlocked) {
            let newColumns = {...columnsObject};
            if (newColumns[key].length < 6) {
                newColumns[key].push({
                    token: currentPlayer,
                    key: generateId()
                });
                setColumnsObject(newColumns);
            };
        };
    };

    if (!endGame.end) {

        return (<>
            <div className="connect4">

                <div className="connect4__player-display">{ `${playersScore[currentPlayer].name}'S TURN` }</div>

                
            <div className="connect4__frame">
            {
                Object.keys(columnsObject).map( key =>
                <>
                <div className={`connect4__column connect4__hover${currentPlayer === 1 ? "-p1" : "-p2"}`}
                     key={ key.toString() }
                     onClick={ () => handleColumnClicked(key)}>
                {
                    columnsObject[key].map( item =>
                        <><div className={ `connect4__item connect4__item${item.token === 1 ? "--p1" : "--p2"}` }>
                          </div></>
                    )
                }
                </div>
                </>
                )
            }
            </div>





            </div>
        </>);

    } else {

        let winner;
        switch (endGame.winner) {
            case 0:
                winner = "GAME WAS A DRAW";
                break;
            case 1:
                winner = `${playersScore[1].name} WINS!`;
                break;
            case 2:
                winner = `${playersScore[2].name} WINS`;
                break;
            default:
                return null
        };

        return (<>
            <div className="connect4">
          
                <div>GAME ENDED!</div>
                <div>{ winner }</div>
                <div>
                    <div>Score:</div>
                    <div>{`${playersScore[1].name}: ${playersScore[1].score}`}</div>
                    <div>{`${playersScore[2].name}: ${playersScore[2].score}`}</div>
                </div>
                <button onClick={ () => restartMatch() }>
                    Start New Match
                </button>
                <button onClick={() => props.restart()}>
                    Change Players
                </button>

            </div>
        </>);
    };
};

ConnectFourMatch.defaultProps = {
    player1: "Player 1",
    player2: "Player 2",
    restart: () => null
};