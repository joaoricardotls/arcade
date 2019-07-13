import React, { useState, useEffect } from "react";
import { MineSweeperMatch } from "./MineSweeperMatch";

export function MineSweeper(props) {

    const [newGame, setNewGame] = useState(false);

    const [difficulty, setDifficulty] = useState('normal');

    const [customObject, setCustomObject] = useState({
        difficulty: 'custom',
        mines: 60,
        columns: 20,
        rows: 20
    });

    const [difficultyObject, setDifficultyObject] = useState({});







    useEffect(() => {
        let newObject = {};
        switch (difficulty) {
            case 'easy':
                newObject = {difficulty: 'easy', mines: 15, columns: 10, rows: 10};
                break;
            case 'hard':
                newObject = {difficulty: 'hard', mines: 100, columns: 25, rows: 25};
                break;
            case 'custom':
                newObject = {...customObject};
                break;
            default:
                newObject = {difficulty: 'normal', mines: 60, columns: 20, rows: 20};
                break;
        };
        setDifficultyObject(newObject);
    }, [difficulty, customObject])

    


    const getMaxMines = () => {
        return Math.floor( ((customObject.columns * customObject.rows) / 10) * 6 );
    };
    




    const handleDifficultyChange = (event) => {
        event.preventDefault();
        setDifficulty(event.target.value);
    };

    const handleCustomMinesChange = (event) => {
        event.preventDefault();
        let newObject = {...customObject};
        newObject.mines = event.target.value;
        setCustomObject(newObject);
    };

    const handleCustomColumnsChange = (event) => {
        event.preventDefault();
        let newObject = {...customObject};
        newObject.columns = event.target.value;
        let maxMines = Math.floor(((newObject.columns * newObject.rows) / 10) * 6);
        if (newObject.mines > maxMines) {
            newObject.mines = maxMines;
        };
        setCustomObject(newObject);
    };

    ;const handleCustomRowsChange = (event) => {
        event.preventDefault();
        let newObject = {...customObject};
        newObject.rows = event.target.value;
        let maxMines = Math.floor(((newObject.columns * newObject.rows) / 10) * 6);
        if (newObject.mines > maxMines) {
            newObject.mines = maxMines;
        };
        setCustomObject(newObject);
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
                                <option value={'custom'}>Custom</option>
                        </select>
                        {
                            difficulty === 'custom' &&

                            <div>
                                <div>
                                    <label>Set Mines</label>
                                    <input type="range" max={ getMaxMines() } min={5} step={1}
                                           value={ customObject.mines }
                                           onChange={ (e) => handleCustomMinesChange(e) }/>
                                    <div>{ customObject.mines }</div>
                                </div>
                                <div>
                                    <label>Set Columns</label>
                                    <input type="range" max={50} min={10} estep={1}
                                           value={ customObject.columns }
                                           onChange={ (e) => handleCustomColumnsChange(e) }/>
                                    <div>{ customObject.columns }</div>
                                </div>
                                <div>
                                    <label>Set Rows</label>
                                    <input type="range" max={50} min={10} step={1}
                                           value={ customObject.rows }
                                           onChange={ (e) => handleCustomRowsChange(e) }/>
                                    <div>{ customObject.rows }</div>
                                </div>
                            </div>
                        }
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