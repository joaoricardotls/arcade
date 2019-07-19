import React, { useState } from "react";

export function Monopoly() {


    const [newGame, setNewGame] = useState({
        start: false,
        players: undefined
    });










    const handleSubmit = () => null;






    return (
        <div className="game monopoly">


        <h2 className="title">Monopoly Game</h2>

            <p className="subtitle">
                Play agains your friends or against computers with up to 4 players in this thriling Monopoly game!
            </p>

            <form className="form" onSubmit={ (e) => handleSubmit(e) }>

                <p className="subtitle">Set players names</p>

                <div className="form__formbox">

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

                </div>

                <div>
                    <button type="submit" className="form__button">
                        Start Game!
                    </button>
                </div>

            </form>






        
        </div>
    );
};