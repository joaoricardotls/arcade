import React, { useState, useEffect } from "react";
import { TicTacToeSquare } from "./TicTacToeSquare";
import { EndScreen } from "./EndScreen";

// TIC-TAC-TOE GAME COMPONENT

export function TicTacToe(props) {

    // positions
    const [positions, setPositions] = useState({
        "A1": {owner: 0, hasBeenClicked: false}, "A2": {owner: 0, hasBeenClicked: false}, "A3": {owner: 0, hasBeenClicked: false},
        "B1": {owner: 0, hasBeenClicked: false}, "B2": {owner: 0, hasBeenClicked: false}, "B3": {owner: 0, hasBeenClicked: false},
        "C1": {owner: 0, hasBeenClicked: false}, "C2": {owner: 0, hasBeenClicked: false}, "C3": {owner: 0, hasBeenClicked: false}
    });

    const [currentPlayer, setCurrentPlayer] = useState(1);

    const [endGame, setEndGame] = useState({end: false, winner: 0});

    const [score, setScore] = useState({player1: 0, player2: 0});

    useEffect(() => {
        let gameEnded = evaluateGame(positions)
        if (gameEnded.end) {
            setEndGame(gameEnded);
        };
    }, [positions]);

    useEffect(() => {
        let newScore = {...score};
        if (endGame.winner === 1) {
            newScore.player1 = newScore.player1 + 1
        } else if (endGame.winner === 2) {
            newScore.player2 = newScore.player2 + 1
        };
        setScore(newScore);
    }, [endGame]);

    const possibleWins = () => [
        /* Columns */ ["A1", "B1", "C1"], ["A2", "B2", "C2"], ["A3", "B3", "C3"],
        /* Rows */ ["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"],
        /* Diagonals */ ["A1", "B2", "C3"], ["A3", "B2", "C1"]
    ];

    const updatePositions = (key, newOwner) => {
        if (!positions[key].hasBeenClicked) {
            let newPositions = {...positions};
            newPositions[key] = {owner: newOwner, hasBeenClicked: true};
            setPositions(newPositions);
            changePlayers();
        };            
    };

    const changePlayers = () => {
        if (currentPlayer === 1) {
            setCurrentPlayer(2)
        } else if (currentPlayer === 2) {
            setCurrentPlayer(1)
        };
    };

    const evaluateGame = (obj) => {
        
        // Compare positions state with possibleWins() to see if any player has won.
        let player1Positions = Object.keys(obj).filter( (key) => obj[key].owner === 1 ),
            player2Positions = Object.keys(obj).filter( (key) => obj[key].owner === 2 ),
            winList = possibleWins();
        
        for (let i = 0; i < winList.length; i++) {

            if (winList[i].every( (pos) => player1Positions.includes(pos) )) {
                console.log("Player 1 Won");
                return {end: true, winner: 1};

            } else if (winList[i].every((pos) => player2Positions.includes(pos))) {
                console.log("Player 2 Won");
                return {end: true, winner: 2};
            };
        };
        
        if /* All spaces are clicked */ (Object.keys(obj).every( (key) => obj[key].hasBeenClicked)) {
            // If no player has won, check wether game board is full and therefore game has ended
            return {end: true, winner: 0};
        };

        return {end: false, winner: 0};
    }

    const resetGame = () => {
        setPositions({
            "A1": {owner: 0, hasBeenClicked: false}, "A2": {owner: 0, hasBeenClicked: false}, "A3": {owner: 0, hasBeenClicked: false},
            "B1": {owner: 0, hasBeenClicked: false}, "B2": {owner: 0, hasBeenClicked: false}, "B3": {owner: 0, hasBeenClicked: false},
            "C1": {owner: 0, hasBeenClicked: false}, "C2": {owner: 0, hasBeenClicked: false}, "C3": {owner: 0, hasBeenClicked: false}
        });
        setEndGame({end: false, winner: 0});
        changePlayers();
    };

    const handleClick = (key) => {
        updatePositions(key, currentPlayer);
    };

    return (
        <>
        <div className="ttt">
            <h3 className="ttt__title">Tic-Tac-Toe</h3>
            <h4 className="ttt__title">{ `Player ${currentPlayer} Turn` }</h4>
            <div className="ttt__box">
            {
                Object.keys(positions).map( (key) =>
                    <TicTacToeSquare key={ key }
                        owner={ positions[key].owner }
                        id={ key }
                        action={ handleClick }/>
                )
            }
            {
                endGame.end && <EndScreen winner={ endGame.winner }
                                    action={ resetGame }
                                    score={ score }/>
            }
            </div>
        </div>
        </>
    );
};