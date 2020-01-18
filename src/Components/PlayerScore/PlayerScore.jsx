import React from 'react';

export default ({title, score}) => {
    let side = title === 'First Player' ? 'left' : 'right'

    return (
        <div className={`player-score ${side}`}>
            <p>{title}</p>
            <span>{score}</span>
        </div>
    )
}