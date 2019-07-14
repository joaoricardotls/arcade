import React, { useState, useEffect, useRef } from "react";
import { Tile } from "./Tile"
import { generateId } from "../utilities/utilities";

export function CheckersMatch() {

    const [gameEnd, setGameEnd] = useState(false);

    const [actionsBlocked, setActionsBlocked] = useState(false);

    const [field, setField] = useState({});

    const [pieceClicked, setPieceClicked] = useState(false);



    const myDivRef = useRef(null);



    useEffect(() => {
        let newField = {},
            blankSpace = true;
        for (let col = 0; col < 8; col++) {
            newField[col] = {};
            for (let row = 0; row < 8; row++) {
                newField[col][row] = {
                    location: [col, row],
                    occupied: undefined,
                    id: generateId()
                };
                if (blankSpace) {
                    newField[col][row].blackTile = row % 2 === 0 ? false : true;
                } else {
                    newField[col][row].blackTile = row % 2 === 0 ? true : false;
                };
            }
            blankSpace = !blankSpace;
        };
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 3; row++) {
                if (newField[col][row].blackTile) {
                    newField[col][row].occupied = {
                        color: "white",
                        queen: false,
                        id: `tile_${generateId()}`
                    };
                };
            };
            for (let row = 7; row > 4; row--) {
                if (newField[col][row].blackTile) {
                    newField[col][row].occupied = {
                        color: "red",
                        queen: false,
                        id: `tile_${generateId()}`
                    };
                };
            };
        };
        console.log(newField);
        setField(newField);
    }, [])

    const handleClick = (index) => {
        if (!actionsBlocked) {
            return null;
        };
    };

    const buttonAction = () => null;


    return (<>
        <div className="checkers">

            <div className="checkers__frame">
            {
                Object.keys(field).map( column =>

                    <div className="checkers__column"
                         key={ column.toString() }>
                    {
                        Object.keys(field[column]).map( tile =>
                            
                                <Tile { ...field[column][tile] }
                                      key={ field[column][tile].id }
                                      handleClick={ handleClick }/>
                        )
                    }
                    </div>
                )
            }
            </div>

            <div>
                <div ref={ myDivRef }>
                    CHANGE ME
                </div>

                <button onClick={ () => buttonAction() }>
                    CLICK
                </button>

            </div>

        </div>
    </>)
};