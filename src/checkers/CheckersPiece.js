import React, { useState, useEffect } from "react";

export function CheckersPiece(props) {

    const getClassName = () => {
        let style = "checkers__piece";
        if (props.player === 1) {
            style = style + " checkers__piece--white";
            if (props.queen) {
                style = style + " checkers__piece--white-queen";
            };
        } else if (props.player === 2) {
            style = style + " checkers__piece--red";
            if (props.queen) {
                style = style + " checkers__piece--red-queen";
            };
        };
        return style;
    };

    return (<>
        <div className={ getClassName() }>
            
        </div>
    </>)
};