import React from "react";
import { CheckersPiece } from "./CheckersPiece";

export function Tile(props) {

    const getClassName = () => {
        return `checkers__tile checkers__tile--${props.blackTile ? "black" : "white"}`
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