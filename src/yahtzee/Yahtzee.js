import React, { useState } from 'react';
import { YahtzeeMatch } from "./YahtzeeMatch";

export function Yahtzee() {
    
    const [newGame, setNewGame] = useState(false);


    const handleClick = (event) => {
        event.preventDefault();
        setNewGame(true);
    };

    if (newGame) {

        return <YahtzeeMatch/>

    } else {

        return (

            <div className="game yahtzee">
                
                <div className="title">Yahtzee Game</div>

                <div className="subtitle">Plan your scores, aim high and beat your opponents in this luck and strategy dice game!</div>

                <button className="form__button"
                        onClick={ e => handleClick(e) }>
                    Start Game!
                </button>
                
            </div>
        );
    };
};