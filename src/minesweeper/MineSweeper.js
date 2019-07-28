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

    const handleRestart = () => {
        setNewGame(false);
        setDifficulty("normal");
    }

    if (newGame) {

        return <MineSweeperMatch restart={ handleRestart }
                                 { ...difficultyObject }/>
    
    } else {

        return (<>
            <div className="game minesweeper">

                <h2 className="title">Minesweeper Game</h2>

                <div className="subtitle">
                    <span>Search for the mines and watch your step!</span>
                    <span>How fast can you find them all?</span>
                </div>

                <form onSubmit={ (e) => handleStart(e) }
                      className="form">

                    <div className="form__difficulty-box">

                        <fieldset>
                            <label>Set Difficulty</label>
                            <select onChange={ (e) => handleDifficultyChange(e) }
                                    value={ difficulty }>
                                    <option value={'easy'}>Easy</option>
                                    <option value={'normal'}>Normal</option>
                                    <option value={'hard'}>Hard</option>
                            </select>
                        </fieldset>

                        <div className="form__difficulty-info">
                            
                            <div className="subtitle">
                                Difficulty <span>{ difficulty.toUpperCase() }</span>
                            </div>

                            <div>
                                Columns: { difficultyObject.columns }
                            </div>

                            <div>
                                Rows: { difficultyObject.rows }
                            </div>

                            <div>
                                Mines: { difficultyObject.mines }
                            </div>

                            <div>
                                Best time: {  }
                            </div>


                        </div>


                    </div>
                    

                    <button className="form__button form__difficulty-button"
                            type="submit">
                        Start Game
                    </button>

                </form>

            </div>
        </>);
    };
};