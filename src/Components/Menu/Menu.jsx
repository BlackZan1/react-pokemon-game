import React, { useState, useEffect } from 'react';
import Fruits from '../Fruits/Fruits';
import Players from '../Players/Players';
import './Menu.css'; 


const style = {
    modal: {
        background: 'rgba(0, 0, 0, 1)',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999'
    },
    nature: {
        background: 'linear-gradient(to top, #00FFFF 5%, #1E90FF 70%, #0f77f5)',
        animation: 'fadeIn 1s ease'
    }
}

export default (props) => {
    let [natureMode, setNatureMode] = useState(false);
    let [chooseMode, setChooseMode] = useState(false);
    let HEIGHT = window.innerHeight;
    let WIDTH = window.innerWidth;

    useEffect(() => {
        setTimeout(() => {
            setNatureMode(true)
        }, 19000)
    }, [natureMode])

    const changeChooseMode = () => {
        setChooseMode(!chooseMode)
    }

    return <>
        <div className='Menu' style={natureMode ? style.nature : null}>
            <div className='Logo'>
                <h1>Just eat It</h1>
                <h2>Pokemon Edition</h2>
            </div>

            <div className='Menu-nav'>
                <button style={natureMode ? {color: '#000'} : {color: '#fff'}} onClick={() => changeChooseMode()}>Play</button>
                <button style={natureMode ? {color: '#000'} : {color: '#fff'}}>Settings</button>
            </div>

            <div className='Menu-git'>
                <a rel="noopener noreferrer" style={natureMode ? {color: '#000', borderColor: '#000'} : {color: '#fff'}} target='_blank' href="https://github.com/BlackZan1?tab=repositories">Go to see author's repositories</a>
            </div>

            {natureMode && <Fruits appWidth={WIDTH} appHeight={HEIGHT} />}
        </div>

        {
            !natureMode && <div style={style.modal}></div>
        }

        {   
            chooseMode && <Players {...props} changeChooseMode={changeChooseMode} /> 
        }
    </>
}