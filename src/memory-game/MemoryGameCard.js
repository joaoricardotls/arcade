import React from "react";

export function MemoryGameCard(props) {
/* MemoryGameCard COMPONENT
    Renders an individual card based on it's props */

    // If the card is disabled, return a blank element of same size and shape that is not clickable
    if (props.disabled) {

        return (<>
            <div className="card card--disabled">
                &nbsp;
            </div>
        </>)

    // If card not disabled, return the card
    } else {

        return (<>
            <div onClick={ () => props.handleClick([props.uniqueId, props.pairId]) }
                 className={ `card` }>

                <div className={ `card__back ${props.backside ? "" : "rotate180"}` }>
                    &nbsp;
                </div>

                <div className={ `card__front ${props.backside ? "rotate-180" : ""}` }>
                    { props.content }
                </div>

            </div>
        </>);
    };
};

MemoryGameCard.defautProps = {
    uniqueId: undefined,
    pairId: undefined,
    content: "",
    backside: true,
    disabled: false,
    handleClick: () => null
};