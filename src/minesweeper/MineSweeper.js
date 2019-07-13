import React, { useState, useEffect } from "react";
import { MineSweeperMatch } from "./MineSweeperMatch";

export function MineSweeper(props) {

    const [newGame, setNewGame] = useState(false);

    const [difficulty, setDifficulty] = useState('normal');

    const [difficultyObject, setDifficultyObject] = useState({});







    useEffect(() => {
        let newObject = {};
        switch (difficulty) {
            case 'easy':
                newObject = {difficulty: 'easy', mines: 5, columns: 10, rows: 10};
                break;
            case 'hard':
                newObject = {difficulty: 'hard', mines: 100, columns: 25, rows: 25};
                break;
            default:
                newObject = {difficulty: 'normal', mines: 60, columns: 20, rows: 20};
                break;
        };
        setDifficultyObject(newObject);
    }, [difficulty])

    




    const handleDifficultyChange = (event) => {
        event.preventDefault();
        setDifficulty(event.target.value);
    };


    const handleStart = (event) => {
        event.preventDefault();
        setNewGame(true);
    }

    if (newGame) {

        return <MineSweeperMatch { ...difficultyObject }/>
    
    } else {

        return (<>
            <div className="minesweeper">

                <h2 className="minesweeper__title">MINESWEEPER GAME</h2>

                <div className="minesweeper__subtitle">
                    <span>Search for the mines and watch your step!</span>
                    <span>How fast can you find them all?</span>
                </div>

                <div>
                    <div>
                        <label>Set Difficulty</label>
                        <select onChange={ (e) => handleDifficultyChange(e) }
                                value={ difficulty }>
                                <option value={'easy'}>Easy</option>
                                <option value={'normal'}>Normal</option>
                                <option value={'hard'}>Hard</option>
                        </select>
                    </div>

                    <div>
                        INFO ON THE DIFFICULTY (name, mines, size and best time)
                    </div>
                </div>

                <button className="minesweeper__button"
                    onClick={ (e) => handleStart(e) }>
                    Start Game
                </button>

            </div>
        </>);
    };
};