import React from "react";
import { CheckersPiece } from "./CheckersPiece";

export function CheckersTile(props) {

    const getClassName = () => {
        let style = "checkers__tile";
        if (props.blackTile) {
            style += " checkers__tile--black";
        } else {
            style += " checkers__tile--white"
        }
        if (props.selected) {
            style += " checkers__tile--selected"
        } else if (props.possibleMovement) {
            style += " checkers__tile--possible"
        } else if (props.mandatoryMovement) {
            style += " checkers__tile--mandatory"
        } else if (props.pieceToBeCaptured) {
            style += " checkers__tile--to-be-captured"
        }
        return style;
    };

    return (
        <div className={ getClassName() }
             onClick={ () => props.handleClick(props.location) }>
        {
            props.occupied !== undefined &&
                <CheckersPiece { ...props.occupied }/>
        }
        </div>
    )
}