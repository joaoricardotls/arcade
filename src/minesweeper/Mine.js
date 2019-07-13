import React, { useState, useEffect } from 'react';

export function Mine(props) {

    const handleLeftClick = (e) => {
        e.preventDefault();
        props.leftClick(props.index);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        props.rightClick(props.index);
    }

    const content = () => {
        if (props.mine) return ""
        else if (props.neighbourMines === 0) return ""
        else return props.neighbourMines;
    }

    const getCSSClasses = () => {
        let newStyle = "minesweeper__mine";
        if (props.hidden) {
            newStyle += " minesweeper__mine--hidden";
            if (props.status === 1) {
                newStyle += " minesweeper__mine--flag";
            } else if (props.status === 2) {
                newStyle += " minesweeper__mine--question";
            };
        } else if (props.mine) {
            if (props.status === 3) {
                newStyle += " minesweeper__mine--flag";
            } else {
                newStyle += " minesweeper__mine--exploded";
            };
        } else if (props.neighbourMines === 0) {
            newStyle += " minesweeper__mine--empty"
        } else {
            newStyle += " minesweeper__mine--visible";
        };
        return newStyle;
    };

    return (
        <>
        <div className={ getCSSClasses() }
             onClick={ (e) => handleLeftClick(e) }
             onContextMenu={ (e) => handleRightClick(e) }>
            {
                !props.hidden && content()
            }
        </div>
        </>
    );
};

Mine.defaultProps = {
    leftClick: () => null,
    rightClick: () => null,
    index: [0, 0],
    mine: false,
    hidden: true,
    neighbourMines: 0,
    status: 0,
    id: undefined
};