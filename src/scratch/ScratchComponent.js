import React, { useState,   buseEffect } from 'react';

export function ScratchComponent() {

    const [textState, setTextState] = useState("");

    const [userInput, setUserInput] = useState("");

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

            <div className="scratch__output">
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
