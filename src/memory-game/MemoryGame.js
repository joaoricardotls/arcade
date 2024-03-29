import React, { useState } from "react";
import { MemoryGameMatch } from "./MemoryGameMatch";

export function MemoryGame() {
/* MemoryGame COMPONENT
    Parent component for the game. Renders a title screen and then a round of matches in the selected difficulty */


    // NEW GAME STATE
    // Object passed for the match component to render with a boolean input and the selected difficulty
    const [newGame, setNewGame] = useState({start: false, difficulty: 80});


    // DIFFICULTY STATE
    // Holds the value for the difficulty input element, an integer representing the seconds of a match (the lesser, the harder)
    const [difficulty, setDifficulty] = useState(80);


    // DIFFICULTY HANDLER
    // Handle changes in the difficulty input element
    const handleChange = (value) => setDifficulty(value);


    // GAME START HANDLER
    // Handle the start of the game when difficulty is submitted
    const handleGameStart = (event) => {
        event.preventDefault();
        setNewGame({start: true, difficulty: difficulty});
    };


    // If game is set to start, return a roud of matches
    if (newGame.start) {

        return <MemoryGameMatch difficulty={ newGame.difficulty }/>

    // If not yet (user didn't click button), return title screen
    } else {

        return (<>

            <div className="game">

                <h2 className="title">Memory Game</h2>

                <p className="subtitle">
                    <span>Select game difficulty and search for the matching cards!</span>
                    <span>Try to beat your friend's score!</span>
                </p>

                <form className="form" 
                    onSubmit={ (event) => handleGameStart(event) }>

                    <select onChange={ (event) => handleChange(event.target.value) }
                        value={ difficulty }
                        className="form__select">
                            <option value={120}>Easy</option>
                            <option value={80}>Normal</option>
                            <option value={60}>Hard</option>
                    </select>

                    <button className="form__button" type="submit">
                        Start!
                    </button>

                </form>

            </div>
        
        </>);
    };
};