import React, { useState, useEffect } from 'react';

export function Mine(props) {

    const handleLeftClick = (e) => {
        e.preventDefault();
        props.leftClick(e, props.index);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        props.rightClick(props.index);
    };

    const content = () => {
        if (props.mine) return ""
        else if (props.neighbourMines === 0) return ""
        else return props.neighbourMines;
    };

    const getCSSClasses = () => {
        let newStyle = "mine";
        if (props.hidden) {
            newStyle += " mine--hidden";
            if (props.status === 1) {
                newStyle += " mine--flag";
            } else if (props.status === 2) {
                newStyle += " mine--question";
            };
        } else if (props.mine) {
            if (props.status === 3) {
                newStyle += " mine--flag";
            } else {
                newStyle += " mine--exploded";
            };
        } else if (props.neighbourMines === 0) {
            newStyle += " mine--empty"
        } else {
            newStyle += " mine--visible";
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