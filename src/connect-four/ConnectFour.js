import React, { useState, useEffect } from "react";
import { ConnectFourMatch } from "./ConnectFourMatch";

export function ConnectFour(props) {

    const [newGame, setNewGame] = useState({
        start: false,
        players: {
            player1: "",
            player2: ""
        }
    });

    const [player1InputValue, setPlayer1InputValue] = useState("")

    const [player2InputValue, setPlayer2InputValue] = useState("")

    const handlePlayer1NameChange = (event) => {
        event.preventDefault();
        setPlayer1InputValue(event.target.value);
    };

    const handlePlayer2NameChange = (event) => {
        event.preventDefault();
        setPlayer2InputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setNewGame({
            start: true,
            players: {
                player1: player1InputValue === "" ? "Player 1" : player1InputValue,
                player2: player2InputValue === "" ? "Player 2" : player2InputValue
            }
        });
    };

    const handleRestart = () => {
        setPlayer1InputValue("");
        setPlayer2InputValue("");
        setNewGame({
            start: false,
            players: {
                player1: "",
                player2: ""
            }
        });
    };

    if (newGame.start) {

        return <ConnectFourMatch restart={ handleRestart }
                                 { ...newGame.players }/>
    
    } else {

        return (<>
            <div className="connect4">

                <h2 className="connect4__title">Connect Four Game</h2>

                <div className="connect4__subtitle">
                    <span>Connect four tokens through any row, column or diagonal to win</span>
                    <span>Don't let your opponent do it first!</span>
                </div>

                <form className="connect4__form" onSubmit={ (e) => handleSubmit(e) }>

                    <div className="connect4__subtitle">Set player's names!</div>

                    <div className="connect4__formbox">

                        <fieldset className="connect4__fieldset">
                            <label>Player 1</label>
                            <input onChange={ (e) => handlePlayer1NameChange(e) }
                                   className="connect4__input"
                                   type="text" id="player1"/>
                        </fieldset>

                        <fieldset className="connect4__fieldset">
                            <label>Player 2</label>
                            <input onChange={ (e) => handlePlayer2NameChange(e) }
                                   className="connect4__input"
                                   type="text" id="player2"/>
                        </fieldset>

                    </div>

                    <button type="submit" className="connect4__button">
                        Start Game!
                    </button>

                </form>

            </div>
        </>);

    }
};