import React, { useState } from "react";
import { ChessMatch } from "./ChessMatch";

export function Chess(props) {

    const [newGame, setNewGame] = useState({
        start: false,
        players: {
            player1: "",
            player2: ""
        }
    });

    const [player1InputValue, setPlayer1InputValue] = useState("");

    const [player2InputValue, setPlayer2InputValue] = useState("");

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

        return <ChessMatch restart={ handleRestart }
                           { ...newGame.players }/>

    } else {

        return (
            <div className="game chess">

                <h2 className="title">Chess Game</h2>

                <p className="subtitle">
                    Will you be the king in this exciting chess game?
                </p>

                <form className="form" onSubmit={ (e) => handleSubmit(e) }>

                    <p className="subtitle">SET PLAYERS NAMES</p>

                    <div className="form__formbox">

                        <fieldset className="form__fieldset">
                            <label>Player 1</label>
                            <input onChange={ (e) => handlePlayer1NameChange(e) }
                                   className="form__text-input"
                                   type="text" id="player1"
                                   placeholder="Player 1"/>
                        </fieldset>

                        <fieldset className="form__fieldset">
                            <label>Player 2</label>
                            <input onChange={ (e) => handlePlayer2NameChange(e) }
                                   className="form__text-input"
                                   type="text" id="player2"
                                   placeholder="Player 2"/>
                        </fieldset>

                    </div>

                    <div>
                        <button type="submit" className="form__button">
                            Start Game!
                        </button>
                    </div>

                </form>

            </div>
        );
    }
};