import React, { useState, useEffect } from 'react';
import { PlayerObject } from "./PlayerObject";
import { YahtzeePlayerScore } from "./YahtzeePlayerScore";
import { getRandomInt, generateId } from "../utilities/utilities";

export function YahtzeeMatch() {
    
    const [gameEnd, setGameEnd] = useState(false);

    const [players, setPlayers] = useState({});

    const [currentPlayer, setCurrentPlayer] = useState(1)

    const [dice, setDice] = useState([6, 6, 6, 6, 6]);

    useEffect(() => {
        let newPlayers = {}
        for (let p = 1; p < 5; p++) {
            newPlayers[p] = new PlayerObject(`Player ${p}`, p);
        };
        console.log(newPlayers);
        setPlayers(newPlayers);
    }, [])


    // useEffect(() => {
    //     let newPlayers = {...players};
    //     Object.keys(newPlayers).forEach(key => {
    //         newPlayers[key].setUpperSectionScore("ones", getRandomInt(1, 70))
    //         console.log(newPlayers[key].getTotalScore());
    //     });
    // }, [players])


    const handleScoreClick = (key) => {
        let newPlayers = { ...players };
        try {
            newPlayers[currentPlayer].setValue[key](dice);
            setPlayers(newPlayers);
        } catch(err) {
            console.log(err);
        };
    };

    const handleShuffleDice = (event) => {
        event.preventDefault();
        let newDice = [];
        for (let i = 0; i < 5; i++) {
            newDice.push(getRandomInt(1, 6));
        };
        setDice(newDice);
    };


    if (!gameEnd) {
        return (
            <div className="game yahtzee">

                <div className="yahtzee__headers">

                    <div className="yahtzee__dice">
                    {
                        dice.map(d => <Dice value={ d }
                                            key={ generateId() }/>)
                    }
                    <button className="form__button" onClick={ e => handleShuffleDice(e) }>
                        Shuffle!
                    </button>
                    </div>

                    <div className="yahtzee__current">
                        <h5>Current Player:</h5>
                        <div>{ `Player ${currentPlayer}` }</div>
                    </div>
                    
                </div>

                <div className="yahtzee__players">
                {
                    Object.keys(players).map( k =>

                        <YahtzeePlayerScore key={ players[k].name }
                                            { ...players[k] }
                                            currentPlayer={ currentPlayer }
                                            clickAction={ handleScoreClick }/>
                    )
                }
                </div>
            
            </div>
        );
    } else {
        return (
            <div className="game yahtzee">
                GAME ENDED
            </div>
        );
    };
};

export const Dice = (props) => {
    return (
        <div className="dice">
            { props.value }
        </div>
    )
} 