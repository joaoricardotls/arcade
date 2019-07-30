import React from 'react';

export function YahtzeePlayerScore(props) {


    const isCurrentPlayer = () => props.number === props.currentPlayer;

    const getScoreClass = () => {
        if (isCurrentPlayer()) {
            return "player__clickable";
        } else {
            return "";
        };
    };

    const handleScoreClicked = (event, key) => {
        event.preventDefault();
        if (isCurrentPlayer()) {
            props.clickAction(key);
        };
    };

    return (
        <div className="player">
            <h4 className="player__name">{ props.name }</h4>
            <div className="player__section">
                <h5>Upper Table:</h5>
                {
                    Object.keys(props.score.upperSection).map( pkey => {
                        return (
                            <div onClick={ e => handleScoreClicked(e, pkey) }
                                 key={ pkey }
                                 className={ getScoreClass() }>
                                <span>{`${pkey}: `}</span>
                                <span>
                                    { props.score.upperSection[pkey] === undefined ? "---" : props.score.upperSection[pkey] }
                                </span>
                            </div>
                        );
                    })
                }
                <div><span className="player--bonus">BONUS:</span><span>{ props.score.upperTotal >= 63 ? "35" : "0" }</span></div>
            </div>

            <div className="player__section">
                <h5>Lower Table:</h5>
                {
                    Object.keys(props.score.lowerSection).map( pkey => {
                        return (
                            <div onClick={ e => handleScoreClicked(e, pkey) }
                                 key={ pkey }
                                 className={ getScoreClass() }>
                                <span>{`${pkey}: `}</span>
                                <span>
                                    { props.score.lowerSection[pkey] === undefined ? "---" : props.score.lowerSection[pkey] }
                                </span>
                            </div>
                        );
                    })
                }
            </div>

            <div className="player__totals">

                <h5>Totals:</h5>
                <div><span>Upper Section:</span><span>{ props.score.upperTotal }</span></div>
                <div><span>Lower Section:</span><span>{ props.score.lowerTotal }</span></div>
                <div><span>Total Score:</span><span>{ props.score.total }</span></div>

            </div>

        </div>
    )
}