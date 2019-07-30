import React, { useState, useRef, useEffect } from 'react';

export function ScratchComponent() {

    const [textState, setTextState] = useState("");

    const [userInput, setUserInput] = useState("");

    const [myPoke, setMyPoke] = useState({});

    const myRef = useRef(null);

    useEffect(() => {
        
        let array = [1, 4, 6, 8, 334, 56, 2, 6, 43, 56];
        const simpleSum = () => {
            return null
        }

    }, [userInput])

    useEffect(() => {

        const getPoke = async (poke) => {
            let pokemon = undefined;
            let url = "https://pokeapi.co/api/v2/pokemon/" + poke;
            fetch(url).then(res => res.json()).then(data => {pokemon = data});
            setTimeout(() => {
                return pokemon
            }, 500);
        };

        console.log(getPoke("bellsprout"))

    }, [myPoke])

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserInput(textState);
    };

    const handleTextAreaChange = (event) => {
        event.preventDefault();
        setTextState(event.target.value)
    };

    return (<>
        <div className="scratch">

            <div className="scratch__output"
                 ref={ myRef }>
                { userInput }
            </div>

            <form className="scratch__form" onSubmit={ (e) => handleSubmit(e) }>

                <textarea onChange={ (e) => handleTextAreaChange(e) }
                          className="scratch__textarea"
                          placeholder="Enter text here"
                          value={ textState }>
                </textarea>

                <button type="submit" className="scratch__button">
                    Submit
                </button>

            </form>

        </div>
    </>);
};
