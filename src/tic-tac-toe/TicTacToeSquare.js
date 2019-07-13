import React, { useState, useEffect } from "react";

export function TicTacToeSquare(props) {

    const [ownerFlag, setOwnerFlag] = useState("");

    useEffect(() => {
        switch (props.owner) {
            case 1:
                setOwnerFlag("X");
                break;
            case 2:
                setOwnerFlag("O");
                break;
            default:
                setOwnerFlag("");
                break;
        };
    }, [props.owner])

    return(<>
        <div className="ttt__square"
            onClick={ () => props.action(props.id) }>
                <span className={`ttt__icon ${ props.owner === 1 ? "ttt__icon--red" : "ttt__icon--blue" }`}>
                    { ownerFlag }
                </span>
        </div>
    </>)
};

TicTacToeSquare.defaultProps = {
    owner: 0,
    action: () => null
};