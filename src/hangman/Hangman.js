import React, { useState, useEffect } from "react";
import { HangmanMatch } from "./HangmanMatch";
import { getRandomInt, removeAccents } from "../utilities/utilities";

export function Hangman(props) {

    const [wordInput, setWordInput] = useState("");

    const [validInput, setValidInput] = useState(false)

    const [randomWordCheck, setRandomWordCheck] = useState(true);

    const [newGame, setNewGame] = useState({start: false, secretWord: ""});

    const hardCodedWords = [
        "banana", "university", "book", "broom", "table",
        "jacket", "pencil", "colorful", "gold", "window",
        "computer", "guitar", "office", "particular", "famous",
        "jogging", "soccer", "sorcerer", "witchcraft", "automobile",
        "marijuana", "flower", "centipede", "burglar", "keyring",
        "conglomerate", "hangman", "arcade", "facebook", "accurate",
        "avocado", "beast", "salesman", "distribution", "number"
    ];


    // INPUT VALIDATION EFFECT
    // Listens for changes in the wordInput state, if it has only letters from A to Z, no Ç, spaces or special characters, marks it as a valid input
    useEffect(() => {
        if (/[^a-zA-Z]+/.test(wordInput) || wordInput.length < 4) {
            setValidInput(false);
        } else {
            setValidInput(true);
        };
    }, [wordInput])


    const getRandomWord = () => {
        return hardCodedWords[getRandomInt(0, hardCodedWords.length - 1)]
    };

    const handleGameRestart = () => {
        setWordInput("")
        setRandomWordCheck(true);
        setValidInput(false);
        setNewGame({
            start: false,
            secretWord: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (randomWordCheck) {
            setNewGame({
                start: true,
                secretWord: getRandomWord()
            });
        } else if (validInput) {
            setNewGame({
                start: true,
                secretWord: wordInput
            });
        };
    };

    const handleTextChange = (e) => {
        e.preventDefault();
        setWordInput(removeAccents(e.target.value));
    };

    const handleCheckboxChange = () => {
        setRandomWordCheck((state) => !state);
    };

    if (newGame.start) {

        return <HangmanMatch word={ newGame.secretWord }
                             restart={ handleGameRestart }/>

    } else {

        // ISSUE: INPUT TYPE PASSWORD is causing the browser to check if user wants to save pasword, among other side-effects I suppose...
        // TODO: User must not type Ç, spaces, hifens of numbers (just word characters from a to z);
        return (<>
            < div className = "hangman" >

                <h2 className="hangman__title">Hangman Game</h2>

                <div className="hangman__subtitle">
                    Play with a random word or enter a secret word and challenge your friends!
                </div>

                <form onSubmit={ (e) => handleSubmit(e) }
                      className="hangman__form"
                      autocomplete="off">
                    <div className="hangman__formbox">
                        <fieldset>
                            <label><span>Play with</span><span>random word</span></label>
                            <div className={ `hangman__checkbox-hack hangman__checkbox-hack${randomWordCheck ? "--checked" : "--unchecked"}` }>
                                <input type="checkbox"
                               value={ randomWordCheck }
                               className="hangman__checkbox"
                               onChange={ () => handleCheckboxChange() }/>
                            </div>
                        </fieldset>
                        <fieldset onClick={ () => setRandomWordCheck(false) }>
                            <label><span>Play with</span><span>secret word</span></label>
                            <input type="password"
                               value={ randomWordCheck ? "" : wordInput }
                               className={ `hangman__input${validInput ? " hangman__input--valid" : " hangman__input--invalid"}${randomWordCheck ? " hangman__input--disabled" : ""}` }
                               onChange={ (e) => handleTextChange(e)}
                               disabled={ randomWordCheck }/>
                            {
                                (!validInput && !randomWordCheck) && 
                                <div className="hangman__warning">
                                    Secret word must have at least 4 letters and must contain only characters from A to Z, with no numbers, spaces, hifens or special characters (case insensitive, accents will be ignored)
                                </div>
                            }
                        </fieldset>
                    </div>

                    <button className="hangman__button">
                        Start!                        
                    </button>

                </form>

            </div>
        </>);
    };
};