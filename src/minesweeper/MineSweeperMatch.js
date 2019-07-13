import React, { useState, useEffect } from "react";
import { generateId, getRandomInt } from "../utilities/utilities";
import { Mine } from "./Mine";

export function MineSweeperMatch(props) {

    const [endGame, setEndGame] = useState(false);

    const [actionsBlocked, setActionsBlocked] = useState(false);

    const [helpScreen, setHelpScreen] = useState(false);

    const [firstClick, setFirstClick] = useState(true);

    const [minesObject, setMinesObject] = useState({});

    const [minesIndexes, setMinesIndexes] = useState([]);

    const [emptySpacesIndexes, setEmptySpacesIndexes] = useState([]);

    const [minesFound, setMinesFound] = useState(0);




    useEffect(() => {
        let newObj = {};
        for (let i = 0; i < props.columns; i++) {
            newObj[i] = {};
            for (let l = 0; l < props.rows; l++) {
                newObj[i][l] = {
                    mine: false,
                    hidden: true,
                    neighbourMines: 0,
                    status: 0,
                    id: generateId()
                };
            };
        };
        setMinesObject(newObj);
    }, []);



    useEffect(() => {
        let minesFound = 0;
        for (let i = 0; i < minesIndexes.length; i++) {
            let [col, row] = [ ...minesIndexes[i] ];
            if (minesObject[col][row].status === 1) {
                minesFound += 1;
            };
        };
        if (minesFound === props.mines) {
            let newMines = { ...minesObject };
            for (let c = 0; c < Object.keys(newMines).length; c++) {
                for (let r = 0; r < Object.keys(newMines[c]).length; r++) {
                    newMines[c][r].status = 3;
                    newMines[c][r].hidden = false;
                };
            };
            setMinesObject(newMines);
            setActionsBlocked(true);
            setTimeout(() => {
                setEndGame(true);
            }, 2000);
        };
    }, [minesObject]);



    const generateMatch = (index) => {
        let [c, r] = [ ...index ],
            newObj = { ...minesObject },
            minesIndexList = [];
        c = parseInt(c);
        r = parseInt(r);
        let neighboursIndexes = [
            [c-2, r-2], [c-1, r-2], [c, r-2], [c+1, r-2], [c+2, r-2],
            [c-2, r-1], [c-1, r-1], [c, r-1], [c+1, r-1], [c+2, r-1],
            [c-2, r],   [c-1, r],   [c, r],   [c+1, r],   [c+2, r],
            [c-2, r+1], [c-1, r+1], [c, r+1], [c+1, r+1], [c+2, r+1],
            [c-2, r+2], [c-1, r+2], [c, r+2], [c+1, r+2], [c+2, r+2]
        ];
        for (let k = 0; k < props.mines; k++) {
            while (true) {
                let col = getRandomInt(0, props.columns - 1),
                    row = getRandomInt(0, props.rows - 1);
                if (!newObj[col][row].mine) {
                    let block = false;
                    neighboursIndexes.forEach((neighb) => {
                        let [nc, nr] = [ ...neighb ];
                        if (col === parseInt(nc) && row === parseInt(nr)) {
                            block = true;
                        };
                    });
                    if (!block && !newObj[col][row].mine) {
                        newObj[col][row].mine = true;
                        minesIndexList.push([col, row]);
                        break;
                    };
                };
            };
        };
        let emptySpacesList = [];
        for (let y = 0; y < Object.keys(newObj).length; y++ ) {
            for (let t = 0; t < Object.keys(newObj[y]).length; t++) {
                let neighbourhood = [],
                    newNeighbours = 0;
                try {neighbourhood.push(newObj[y - 1][t - 1])} catch {};
                try {neighbourhood.push(newObj[y][t - 1])} catch {};
                try {neighbourhood.push(newObj[y + 1][t - 1])} catch {};
                try {neighbourhood.push(newObj[y + 1][t])} catch {};
                try {neighbourhood.push(newObj[y + 1][t + 1])} catch {};
                try {neighbourhood.push(newObj[y][t + 1])} catch {};
                try {neighbourhood.push(newObj[y - 1][t + 1])} catch {};
                try {neighbourhood.push(newObj[y - 1][t])} catch {};
                neighbourhood.forEach( item => {
                    if (item !== undefined && item.mine) {
                        newNeighbours++;
                    };
                });
                if (newNeighbours === 0 && !newObj[y][t].mine) {
                    emptySpacesList.push([y, t]);
                };
                newObj[y][t].neighbourMines = newNeighbours;
            };
        };
        return [newObj, minesIndexList, emptySpacesList];
    };




    const clearEmptySpaces = (minesObj, empties) => {
        let clearObj = { ...minesObj };
        let remaining = 0;
        do {
            let rem = 0;
            empties.forEach( index => {
                let [col, row] = [ ...index ];
                if (!clearObj[col][row].hidden) {
                    try {
                        if (clearObj[col - 1][row - 1].hidden) {
                            clearObj[col - 1][row - 1].hidden = false;
                            if (clearObj[col - 1][row - 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col][row - 1].hidden) {
                            clearObj[col][row - 1].hidden = false;
                            if (clearObj[col][row - 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col + 1][row - 1].hidden) {
                            clearObj[col + 1][row - 1].hidden = false;
                            if (clearObj[col + 1][row - 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col + 1][row].hidden) {
                            clearObj[col + 1][row].hidden = false;
                            if (clearObj[col + 1][row].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col + 1][row + 1].hidden) {
                            clearObj[col + 1][row + 1].hidden = false;
                            if (clearObj[col + 1][row + 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col][row + 1].hidden) {
                            clearObj[col][row + 1].hidden = false;
                            if (clearObj[col][row + 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col - 1][row].hidden) {
                            clearObj[col - 1][row].hidden = false;
                            if (clearObj[col - 1][row].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                    try {
                        if (clearObj[col - 1][row + 1].hidden) {
                            clearObj[col - 1][row + 1].hidden = false;
                            if (clearObj[col - 1][row + 1].neighbourMines === 0) {
                                rem += 1;
                            };
                        };
                    } catch {};
                };
            });
            remaining = rem;
        } while (remaining > 0);
        return clearObj;
    };


    




    const handleHelpScreen = () => {
        setHelpScreen(value => !value);
    };

    const handleLeftClick = (index) => {
        if (!actionsBlocked) {
            let [col, row] = [...index];
            if (firstClick) {
                let [newMines, minesIndexList, emptySpacesList] = generateMatch(index);
                newMines[col][row].hidden = false;
                newMines = clearEmptySpaces(newMines, emptySpacesList);
                setMinesObject(newMines);
                setMinesIndexes(minesIndexList);
                setEmptySpacesIndexes(emptySpacesList);
                setFirstClick(false);
            } else {
                let newMines = { ...minesObject };
                if (newMines[col][row].status === 0 && newMines[col][row].hidden) {
                    newMines[col][row].hidden = false;
                    // DEFEAT
                    if (newMines[col][row].mine) {
                        for (let c = 0; c < Object.keys(newMines).length; c++) {
                            for (let r = 0; r < Object.keys(newMines[c]).length; r++) {
                                newMines[c][r].hidden = false;
                                newMines[c][r].status = 0;
                            };
                        };
                        setActionsBlocked(true);
                        setTimeout(() => {
                            setEndGame(true);
                        }, 2000);
                    } else if (newMines[col][row].neighbourMines === 0) {
                        newMines = clearEmptySpaces(newMines, emptySpacesIndexes);
                    };
                    setMinesObject(newMines);
                };
            };
        };
    };

    const handleRightClick = (index) => {
        if (!actionsBlocked && !firstClick) {
            let [col, row] = [ ...index ],
                newMines = { ...minesObject };
            if (newMines[col][row].hidden) {
                switch (newMines[col][row].status) {
                    case 0:
                        newMines[col][row].status = 1;
                        setMinesFound(found => found + 1);
                        break;
                    case 1:
                        newMines[col][row].status = 2;
                        setMinesFound(found => found - 1);
                        break;
                    case 2:
                        newMines[col][row].status = 0;
                        break;
                    default:
                        break;
                };
                setMinesObject(newMines);
            };
        };
    };
    
    const handleReset = (event) => {
        event.preventDefault();
        return null;
    };

    const handleExit = (event) => {
        event.preventDefault();
        return null;
    };







    if (!endGame) {

        return (<>

            {
                helpScreen &&
                <div className="minesweeper__helpscreen">
                    <h2 className="minesweeper__title">
                        CONTROLS
                    </h2>
                    <div className="minesweeper__subtitle">
                        Left Mouse Click: Reveal mine field
                    </div>
                    <div className="minesweeper__subtitle">
                        Left Mouse Click: Toggles flag or question mark on mine field
                    </div>
                    <button className="minesweeper__button"
                            onClick={ () => handleHelpScreen() }>
                        Return
                    </button>
                </div>
            }

            <div className="minesweeper">

                <nav className="minesweeper__navigation">
                    <div className="minesweeper__navitem">
                        <h4>MINES FOUND:</h4>
                        <span>{ `${minesFound} / ${props.mines}` }</span>
                    </div>
                    <div className="minesweeper__timer">
                        <h4>TIME ELAPSED:</h4>
                        <span>01h 00m 00s</span>
                        
                    </div>
                    <div className="minesweeper__navitem">
                        <h4>DIFFICULTY:</h4>
                        <span>{`${props.difficulty.toUpperCase()}`}</span>
                    </div>
                    <div className="minesweeper__navitem">
                        <h4>BEST TIME:</h4>
                        <span>01h 00m 00s</span>
                    </div>
                    <button className="minesweeper__nav-button"
                            onClick={ (e) => handleReset(e) }>
                        Reset
                    </button>
                    <button className="minesweeper__nav-button"
                            onClick={ (e) => handleExit(e) }>
                        Exit
                    </button>
                    <button className="minesweeper__nav-button"
                            onClick={ (e) => handleHelpScreen(e) }>
                        Help
                    </button>
                </nav>

                <div className="minesweeper__gamescreen"
                     onContextMenu={ (e) => e.preventDefault() }>
                {
                    Object.keys(minesObject).map( colKey =>
                        <>
                        <div className="minesweeper__column">
                        {
                            Object.keys(minesObject[colKey]).map( mineKey =>
                                
                                <Mine { ...minesObject[colKey][mineKey] }
                                      key={ minesObject[colKey][mineKey].id }
                                      leftClick={ handleLeftClick }
                                      rightClick={ handleRightClick }
                                      index={ [colKey, mineKey] }/>
                            )
                        }                            
                        </div>
                        </>
                    )
                }
                </div>

            </div>
        </>);

    } else {

        return (<>
            <div className="minesweeper">
                GAME END
            </div>
        </>);
    };
};

MineSweeperMatch.defaultProps = {};