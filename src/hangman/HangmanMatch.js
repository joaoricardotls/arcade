import React, { useState, useEffect } from "react";
import { generateId } from "../utilities/utilities";

export function HangmanMatch(props) {
/* HangmanMatch COMPONENT
    Main component and functionality for a Hangman match, receives a word as a prop that will set as the secret word to be guessed and also a function props with no parameters that restarts the game in the parent */


    // END GAME STATE
    // Sets the end of the game and wether the last match was won or lost
    const [endGame, setEndGame] = useState({end: false, win: false});


    // ACTIONS BLOCKED STATE
    // Bollean to block all click actions just before the game ends
    const [blockActions, setBlockActions] = useState(false);


    // REMAINING LIVES STATE
    // Set the remaining guesses avaiable in an integer value
    const [remainingLives, setRemainingLives] = useState(5);


    // LETTER BUTTONS STATE
    // Object that renders the buttons for guessing letters in the word, each letter has a char property to be evaluated on click and a guessed propery that enables (false) or disables (true) the style change and checks for repeated guesses
    const [letterButtons, setLetterButtons] = useState([
        {char: "A", guessed: false}, {char: "B", guessed: false}, {char: "C", guessed: false},
        {char: "D", guessed: false}, {char: "E", guessed: false}, {char: "F", guessed: false},
        {char: "G", guessed: false}, {char: "H", guessed: false}, {char: "I", guessed: false},
        {char: "J", guessed: false}, {char: "K", guessed: false}, {char: "L", guessed: false},
        {char: "M", guessed: false}, {char: "N", guessed: false}, {char: "O", guessed: false},
        {char: "P", guessed: false}, {char: "Q", guessed: false}, {char: "R", guessed: false},
        {char: "S", guessed: false}, {char: "T", guessed: false}, {char: "U", guessed: false},
        {char: "V", guessed: false}, {char: "W", guessed: false}, {char: "X", guessed: false},
        {char: "Y", guessed: false}, {char: "Z", guessed: false}
    ]);


    // SECRET LETTERS STATE
    // Object that holds information of each letter in the secret word, each word object inside it will have a numbered key to persist it's position, a char property (uppercase letter string) to be compared with on guesses evaluation, a revealed property (boolean) to handle style change and check for correct guesses and a key property (unique string) that won't change, for React reconciliation
    const [secretLettersObject, setSecretLettersObject] = useState({});

    
    // MOUNT SECRET LETTERS EFFECT
    // After component mounts, create a new secretLettersObject with updated state based on an array of letters from the secret word received as props (all letters hidden, with uppercase characters and each with an unique ID)
    useEffect(() => {
        let lettersArr = props.word.split(''),
            lettersObj = {};
        for (let i = 0; i < lettersArr.length; i++) {
            lettersObj = {
                ...lettersObj,
                [i]: {
                    char: lettersArr[i].toUpperCase(),
                    revealed: false,
                    key: generateId()
                }
            };
        };
        setSecretLettersObject(lettersObj);
    }, [])


    // CHECK FOR ZERO LIVES EFFECT
    // Listens for changes in the remainingLives state and if they are zero, blocks the game and ends it afterwards as a defeat
    useEffect(() => {
        if (remainingLives === 0) {
            setBlockActions(true);
            setTimeout(() => {
                setEndGame({end: true, win: false});
            }, 1000);
        };
    }, [remainingLives])


    // CHECK FOR GAME WIN EFFECT
    // Listens for changes in the secretLettersObject state and if all secret letters are revealed, blocks the game and ends it afterwards as a victory
    useEffect(() => {
        if (Object.keys(secretLettersObject).every(key => secretLettersObject[key].revealed === true) &&
                Object.keys(secretLettersObject).length > 0) {
            setBlockActions(true);
            setTimeout(() => {
                setEndGame({end: true, win: true});
            }, 1000);
        };
    }, [secretLettersObject])


    // LETTER CLICKED HANDLER
    // Handles the actions performed after a letter button is clicked
    const handleLetterClicked = (char) => {

        // If actions are not blocked
        if (!blockActions) {

            // Create a new array for the letter buttons state, a new object for the secret letters state, and two boolean variables that will control accurate and repeated guesses
            let newLetters = [...letterButtons],
                newLettersObj = {...secretLettersObject},
                correctGuess = false,
                repeatedGuess = false;
            // Compare the guessed character with each letter in the secret letters object, if they match and the letter has not been revealed, reveal it and mark the guess as accurate
            Object.keys(newLettersObj).forEach(key => {
                if (newLettersObj[key].char === char && !newLettersObj[key].revealed) {
                    newLettersObj[key].revealed = true;
                    correctGuess = true;
                };
            });
            // Compare the guessed character with each button in the letters button array, if the specified button has not been clicked yet, mark it as guessed, or else mark the guess as repeated
            newLetters.forEach(letter => {
                if (letter.char === char && !letter.guessed) {
                    letter.guessed = true;
                } else if (letter.char === char && letter.guessed) {
                    repeatedGuess = true;
                };
            });
            // Updates the letterButtons and secretLettersObject states, and if the guess was both incorrect and unrepeated, player loses one life
            if (!correctGuess && !repeatedGuess) {
                setRemainingLives(lives => lives - 1);
            };
            setLetterButtons(newLetters);
            setSecretLettersObject(newLettersObj);
        };
    };


    // RENDER
    // If game has not ended
    if (!endGame.end) {

        // Return a match, mapping the buttons and the letters from the secret word
        return (<>
            <div className="hangman">

                <div className="hangman__lives">
                    Remaining lives: <span>{ remainingLives }</span>
                </div>

                <div className="hangman__word">
                {
                    Object.keys(secretLettersObject).map(key =>
                        <div className={ secretLettersObject[key].revealed ? "hangman__letter" : "hangman__letter hangman__letter--hidden" }
                             key={ secretLettersObject[key].key }>
                            { secretLettersObject[key].char }
                        </div>
                    )
                }
                </div>

                <div className="hangman__buttons">
                {
                    letterButtons.map( letter => 
                        <button onClick={ () => handleLetterClicked(letter.char) }
                                className = {
                                    `hangman__letter-button${letter.guessed ? "--guessed" : ""}`
                                }
                                key={ letter.char }>
                            { letter.char }
                        </button>
                    )
                }
                </div>

            </div>
        </>);

    // If game has ended
    } else {

        // Return end screen, saying wether the last match was a victory or a defeat
        return (<>
            <div className="hangman hangman__endscreen">

                <h2 className="hangman__title">
                    { endGame.win ? "YOU WIN! CONGRATULATIONS!" : "YOU LOSE!" }
                </h2>

                <div className="hangman__subtitle">
                    SECRET WORD WAS "{ props.word.toUpperCase() }"
                </div>

                <button className="hangman__button hangman__button--restart"
                        onClick={ () => props.restart() }>
                    Restart Game
                </button>

            </div>
        </>);
    };
};

HangmanMatch.defaultProps = {
    word: "",
    restart: () => null
};