import React, { useState, useEffect } from 'react';
import { Countdown } from "./Countdown";
import { MemoryGameCard } from "./MemoryGameCard";
import { generateId, shuffleArray } from "../utilities/utilities";

export function MemoryGameMatch(props) {

/* COMPONENT MemoryGameMatch
    The main component that renders a Memory Game match round
    Receives a difficulty prop (integer), that will be read as the number of seconds a match must have */


    // END GAME STATE
    // Sets an object that determines wether the game has ended (true) or not yet (false),and also the last match duration
    const [gameEnd, setGameEnd] = useState({end: false, matchTime: 0});


    // MATCH TIME STATE
    // Stores the current seconds elapsed in a match
    const [matchTime, setMatchTime] = useState(0);


    // BEST TIME STATE
    // While the match is rendered, sets the best time of the round
    const [bestTime, setBestTime] = useState(props.difficulty)


    // CARDS STATE
    // Sets an array of objects for all cards in the game
    const [cards, setCards] = useState([])


    // CARDS CLICKED STATE
    // Sets an object with properties that control first and second click on the cards and cards comparison
    const [cardsClicked, setCardsClicked] = useState({
        1: {clicked: false, card: undefined},
        2: {clicked: false, card: undefined}
    });


    // CARDS CONTENTS PROPERTY
    // Constant that delimits the content of the cards available for rendering
    const cardsContents = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];


    // SET BEST TIME EFFECT
    // Listens to changes in the gameEnd state and evaluates if last match's time is lower than the best time
    // ITS STILL BUGGY DUNNO WHY (lets see if fixed after adding bestTime dependency)
    useEffect(() => {
        if (gameEnd.matchTime < bestTime && gameEnd.end) {
            setBestTime(gameEnd.matchTime);
        };
    }, [gameEnd, bestTime])


    // GENERATE CARDS EFFECT
    // On mount, generate an array of objects (for each card and it's pair) with unique IDs
    useEffect(() => {
        let cardsArray1 = createCardsArray(),
            cardsArray2 = createCardsArray(),
            newGameCards = cardsArray1.concat(cardsArray2);
        newGameCards = shuffleArray(newGameCards);
        setCards(newGameCards);
    }, []);


    // TWO CARDS CLICKED EFFECT
    // Listens for changes in the cardsClicked effect and checks if both cards chosen are a pair
    // If they are a pair, disables them, and after that turn all cards back faced and clear the cardsClicked state
    useEffect(() => {
        if (cardsClicked[1].clicked && cardsClicked[2].clicked) {
            if (cardsClicked[1].card[1] === cardsClicked[2].card[1]) {
                setTimeout(() => {
                    disableCardsPair(cardsClicked[1].card[1] || cardsClicked[2].card[1])
                }, 500)
            };
            setTimeout(() => {
                allCardsBackFace();
                clearCardsClicked();
            }, 500)
        };
    }, [cardsClicked])


    // GAME WON CHECK EFFECT
    // Listens to changes in the cards state and if all cards are disabled, game ends with current score in seconds
    useEffect(() => {
        if (cards.length === cardsContents.length * 2 &&
            cards.every((card) => card.disabled === true)) {
                endGame(matchTime);
            };
    }, [cards]);


    // CREATE CARDS ARRAY METHOD
    // Create an array with card objects, based on the cardsContents property
    // Each card object has an unique ID, a pair ID (for identifying it's pair), the content to be displayed on the front-side, a boolean value for wether it is back-side up or not and another boolean value to check wether it has been disabled
    const createCardsArray = () => {
        let newGameCards = [];
        for (let i = 0; i < cardsContents.length; i++) {
            newGameCards.push({
                uniqueId: generateId(),
                pairId: i,
                content: cardsContents[i],
                backside: true,
                disabled: false
            });
        };
        return newGameCards;
    };


    // TOGGLE CARD FLIP METHOD
    // Receives a card's unique ID and apply a change to it's backside property (sets the opposite boolean value)
    const toggleFlipCard = (cardID) => {
        let updatedCards = [...cards];
        updatedCards.forEach((card) => {
            if (card.uniqueId === cardID) {
                card.backside = !card.backside;
            };
        });
        setCards(updatedCards);
    };


    // TURN ALL CARDS BACKFACE METHOD
    // After a comparison, turn all cards backface up
    const allCardsBackFace = () => {
        let updatedCards = [...cards];
        updatedCards.forEach((card) => {
            card.backside = true;
        });
        setCards(updatedCards);
    };


    // CLEAR CLICKED CARDS METHOD
    // Resets the clearCards state for a new card comparison
    const clearCardsClicked = () => {
        setCardsClicked({
            1: {clicked: false, card: undefined},
            2: {clicked: false, card: undefined}
        });
    };


    // DISABLE CARDS PAIR METHOD
    // When a pair of cards is found, set it's disabled property to true
    const disableCardsPair = (id) => {
        let updatedCards = [...cards];
        updatedCards.forEach((card) => {
            if (card.pairId === id) {
                card.disabled = true;
            };
        });
        setCards(updatedCards);
    };


    // CARD CLICK EVENT HANDLER
    // Receives data from the child card clicked event and updates cardsClicked state
    const handleCardClicked = (arr) => {
        
        // Destructure the received array in an unique card ID and a pair ID
        let [key, id] = [...arr];

        // If the first card was not clicked
        if (!cardsClicked[1].clicked) {

            // Update the cards so the one clicked flips front-side and save first card IDs
            toggleFlipCard(key);
            setCardsClicked( (obj) => { return {
                ...obj,
                1: {clicked: true, card: [key, id]}
            }});

        // If the first card was already clicked and if second card was not clicked and was another card then the exact first one
        } else if (!cardsClicked[2].clicked && cardsClicked[1].card[0] !== key) {

            // Update the cards so the one clicked flips front-side and save second card IDs
            toggleFlipCard(key);
            setCardsClicked( (obj) => { return {
                ...obj,
                2: {clicked: true, card: [key, id]}
            }});
        };
    };


    // HANDLE TIME VALUE RETURN HANDLER
    // Receives the current seconds elapsed from timer and updates state
    const handleTimeValueReturn = (time) => {
        setMatchTime(time);
    };


    // END GAME HANDLER
    // When game ends, updates endGame object
    const endGame = (seconds) => {
        setGameEnd({
            end: true,
            matchTime: seconds
        });
    };


    // RESTART GAME HANDLER
    // Resets endGame object for a new game
    const restartGame = () => {
        let cardsArray1 = createCardsArray(),
            cardsArray2 = createCardsArray(),
            newGameCards = cardsArray1.concat(cardsArray2);
        newGameCards = shuffleArray(newGameCards);
        setCards(newGameCards);
        setGameEnd({end: false, matchTime: 0})
    }


    // RENDER
    // If game has not ended
    if (!gameEnd.end) {

        return (
            <div className="game">

                <div className="memory-game__cards-container">
                {
                    cards.map( (card) => 
                        <MemoryGameCard key={ card.uniqueId }
                                        handleClick={ handleCardClicked }
                                        { ...card }/>
                    )
                }
                </div>
                
                <Countdown seconds={ props.difficulty }
                           endTimer={ endGame }
                           returnTime={ handleTimeValueReturn }/>
            </div>
        );

    // If game has ended
    } else {

        return (
            <div className="game">

                {
                    gameEnd.matchTime !== props.difficulty &&
                    <><h2 className="memory-game__title">Victory!</h2>
                      <div className="memory-game__paragraph">Game ended in { gameEnd.matchTime } seconds</div></>
                }

                {
                    gameEnd.matchTime === props.difficulty &&
                    <><h2 className="memory-game__title">You Lose</h2>
                      <div className="memory-game__paragraph">Try again!</div></> 
                }

                <div className="memory-game__paragraph">
                    Best time: { bestTime } seconds
                </div>

                <button onClick={ () => restartGame() }
                    className="button--grey">
                    Restart
                </button>

            </div>
        );
    };
};

MemoryGameMatch.defaultProps = {
    difficulty: 80
};