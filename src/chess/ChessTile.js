import React from "react";
import { ChessPiece } from "./ChessPiece";

export function ChessTile(props) {

    const getClassName = () => {
        let style = "chess__tile";
       
        return style;
    };

    return (
        <div className={ getClassName() }
             onClick={ () => props.handleClick(props.location) }>
        {
            props.occupied !== undefined &&
                <ChessPiece { ...props.occupied }/>
        }
        </div>
    )
}