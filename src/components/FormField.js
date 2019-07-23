import React, { useState } from "react";
import { generateId } from "../utilities/utilities";

export function FormField(props) {

    const [value, setValue] = useState();


    const handlePlayer1NameChange = (event) => {
        event.preventDefault();
        return null;
    };

    const handleInputChange = (event) => {
        event.preventDefault();
        return null;
    };

    const getClassName = () => {
        return null;
    }





    switch (props.type) {

        case "text":
            return (
                <fieldset className="fieldset">
                    <label>{ props.label }</label>
                    <input onChange={ (e) => handleInputChange(e) }
                           className={ getClassName() }
                           type="text" id={ props.id }
                           placeholder={ props.placeholder }/>
                </fieldset>
            );

        case "select":
            return (
                <fieldset className="fieldset">
                    <label>{ props.label }</label>
                    <select onChange={ (e) => handleInputChange(e) }
                            value={ difficulty }>
                        <option value={'easy'}>Easy</option>
                        <option value={'normal'}>Normal</option>
                        <option value={'hard'}>Hard</option>
                    </select>>
                </fieldset>
            );

        case "checkbox":
            return (null);

        default:
            throw new Error("You must select a type props for the Form Field component");
    }
}