import React, { useState, useEffect } from 'react';

export function Countdown(props) {
/* COMPONENT Countdown
    Countdown timer component for the Memory Game
    Receives a seconds prop (integer) that will be the number of seconds to countdown */


    // SECONDS STATE
    // Sets the seconds remaining for countdown, in miliseconds
    const [seconds, setSeconds] = useState(props.seconds * 1000);


    // TIMER EFFECT
    // On mount, create an interval to reduce 10ms from the seconds state each 10ms
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(sec => sec - 100);
        }, 100);
        return () => clearInterval(timer);
    }, [])


    // COUNTDOWN ZERO EFFECT
    // Listens to seconds state and return to parent component total seconds passed once it reaches zero
    useEffect(() => {
        if (seconds <= 0) props.endTimer(props.seconds);
    }, [seconds])


    // TIME RETURN TO PARENT EFFECT
    // Each time seconds state is changed, send value back to parent
    useEffect(() => {
        let currentTime = parseFloat(((props.seconds * 1000) - seconds) / 1000).toFixed(1);
        props.returnTime(currentTime);
    }, [seconds]);


    // RENDER
    // On render, convert miliseconds to a seconds float with 1 floating point number
    return (<>

        <div className="countdown-timer">
            Time remaining: <span className="countdown-timer__number">
                                { parseFloat(seconds / 1000).toFixed(1) }
                            </span> seconds
        </div>

    </>);
};

Countdown.defaultProps = {
    seconds: 80,
    returnTime: () => null,
    endTimer: () => null
};