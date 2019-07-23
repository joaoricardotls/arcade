import React, { useState } from "react";
import { MonopolyMatch } from "./MonopolyMatch";

export function Monopoly() {


    const [newGame, setNewGame] = useState({
        start: false,
        players: undefined
    });

    const [players, setPlayers] = useState({1: "Player 1"});










    const handleSubmit = (e) => {
        e.preventDefault();
        setNewGame({
            start: true,
            players: players
        });
    };

    const handlePlayerNumberChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        let newPlayers = {};
        for (let i = 1; i < parseInt(event.target.value) + 1; i++) {
            newPlayers[i] = `Player ${i}`;
        };
        console.log(newPlayers);
        setPlayers(newPlayers);
    }

    if (newGame.start) {

        return <MonopolyMatch/>
    } else {

        return (

            <div className="game monopoly">


            <h2 className="title">Monopoly Game</h2>

                <p className="subtitle">
                    Play agains your friends or against computers with up to 4 players in this thriling Monopoly game!
                </p>

                <form className="form" onSubmit={ (e) => handleSubmit(e) }>

                    <p className="subtitle">Choose the number of players</p>

                    <fieldset>
                        <label> {
                            `${Object.keys(players).length} player${Object.keys(players).length !== 1 ? "s" : ""}`
                        } </label>
                        <input type="range" id="playersNum"
                            min={ 1 } max={ 4 }
                            onChange={ (e) => handlePlayerNumberChange(e) }
                            defaultValue={ 1 }/>
                    </fieldset>

                    {/* <div className="form__formbox">

                        <fieldset className="form__fieldset">
                            <label>Player 1</label>
                            <input onChange={ (e) => null }
                                className="form__text-input"
                                type="text" id="player1"
                                placeholder="Player 1"/>
                        </fieldset>

                        <fieldset className="form__fieldset">
                            <label>Player 2</label>
                            <input onChange={ (e) => null }
                                className="form__text-input"
                                type="text" id="player2"
                                placeholder="Player 2"/>
                        </fieldset>

                    </div> */}

                    <div>
                        <button type="submit" className="form__button">
                            Start Game!
                        </button>
                    </div>

                </form>
            
            </div>
        );
    };
};