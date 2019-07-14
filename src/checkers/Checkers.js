import React, { useState } from "react";
import { CheckersMatch } from "./CheckersMatch";

export function Checkers() {

    const [startGame, setStartGame] = useState(false);

    const handleStart = (e) => {
        e.preventDefault();
        setStartGame(true);
    };

    if (startGame) {

        return <CheckersMatch/>

    } else {

        return (<>
            <div className="checkers">

                <button onClick={ (e) => handleStart(e) }>START!</button>

            </div>
        </>);
    };
};