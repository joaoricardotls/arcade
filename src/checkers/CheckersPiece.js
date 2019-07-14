import React, { useState, useEffect } from "react";

export function CheckersPiece(props) {

    const getClassName = () => {
        return `checkers__piece checkers__piece--${props.color === 'red' ? "red" : "white"}`
    };

    return (<>
        <div className={ getClassName() }>
            
        </div>
    </>)
};