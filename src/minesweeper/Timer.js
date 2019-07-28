import React, { useState, useEffect } from "react";

export function Timer(props) {

    const [milisseconds, setMilisseconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setMilisseconds(sec => sec + 100);
        }, 100);
        return () => clearInterval(timer);
    }, [])

    const formatTime = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60).toString(),
            minutes = Math.floor(((ms / 1000) / 60) % 60).toString(),
            hours = Math.floor(((ms / 1000) / 60) / 60).toString();
        seconds = seconds.length < 2 ? `0${seconds}` : seconds;
        minutes = minutes.length < 2 ? `0${minutes}` : minutes;
        hours = hours.length < 2 ? `0${hours}` : hours;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="timer">
            <h4>TIME ELAPSED:</h4>
            <span>
                { formatTime(milisseconds) }
            </span>
        </div>
    );
};