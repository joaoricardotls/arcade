import React, { useState, useEffect, useRef } from "react";
import { TicTacToe } from "./tic-tac-toe/TicTacToe";
import { Hangman } from "./hangman/Hangman";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { MemoryGame } from "./memory-game/MemoryGame";
import { ScratchComponent } from "./scratch/ScratchComponent";
import { ConnectFour } from "./connect-four/ConnectFour";
import { MineSweeper } from "./minesweeper/MineSweeper";
import { Checkers } from "./checkers/Checkers";

export function Arcade() {

    const [dropMenu, setDropMenu] = useState(false);

    const sections = [
        {text: "Arcade", path: "home", component: TitleScreen},
        {text: "Tic-Tac-Toe", path: "tic-tac-toe", component: TicTacToe},
        {text: "Minesweeper", path: "minesweeper", component: MineSweeper},
        {text: "Memory Game", path: "memory-game", component: MemoryGame},
        {text: "Hangman", path: "hangman", component: Hangman},
        {text: "Connect Four", path: "connect-four", component: ConnectFour},
        {text: "Checkers", path: "checkers", component: Checkers},
        {text: "Scratch", path: "scratch", component: ScratchComponent}
    ];

    return (
        <BrowserRouter>
        <div className="container">

            <NavigationMenu sections={ sections }/>

            <div className="screen">
            {
                sections.map( (section) => 
                    <>
                    <Route component={ section.component }
                           path={ `/${section.path}` }
                           key={ section.path.concat(section.path) }/>
                    </>
                )
            }
            </div>

        </div>
        </BrowserRouter>
    );
};

export function TitleScreen(props) {
    return (<>
    
        <div className="title-screen">
            Welcome to my Arcade Machine!
        </div>
    
    </>);
};





export function NavigationMenu(props) {

    const [dropMenu, setDropMenu] = useState(false);

    const handleDropMenu = (event) => {
        event.preventDefault();
        setDropMenu(value => !value);
    };

    return (
        <nav className={`navigation${dropMenu ? " navigation--drop" : ""}`}
             onClick={ (e) => handleDropMenu(e) }>
            {
                props.sections.map( (section) =>
            
                    <NavLink key={ section.path } to={ `/${section.path}` }
                             className={`navigation__item${dropMenu ? " navigation__item--drop" : ""}`}>
                             { section.text }
                    </NavLink>
                )
            }
        </nav>
    )
}