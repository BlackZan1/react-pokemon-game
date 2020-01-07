import React, { useState, useEffect } from 'react';
import GameBg from '../../audio/bg.mp3';
import MenuBg from '../../audio/menu.mp3';

export default ({gameMode, menuMode}) => {
    let [music, setMusic] = useState({
        play: false,
        audio: new Audio()
    });

    useEffect(() => {
        if(gameMode) {
            setMusic({
                play: true,
                audio: new Audio(GameBg)
            })
        }
        else if(menuMode) {
            setMusic({
                play: true,
                audio: new Audio(MenuBg)
            })
        }
    }, [music, gameMode, menuMode])

    return <>
        {
            music.play && music.audio.play()
        }
    </>
}