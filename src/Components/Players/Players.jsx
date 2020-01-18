import React, { useEffect } from 'react';
import Animator from 'react-sprite-animator';
import Axios from 'axios';
import './Players.css';

export default ({choosePlayer, changeChooseMode}) => {
    let [items, setItems] = React.useState([]);
    let [playersData, setPlayersData] = React.useState({
        player: 'first',
        data: {
            fp: {},
            sp: {}
        }
    });

    useEffect(() => {
        if(!items.length) {
            Axios.get('/react-pokemon-game/heroData.json') 
            // Axios.get('/heroData2.json') // for testing
            .then(res => res.data.heroData)
            .then(res => {
                setItems([
                    ...res
                ])
            })
        }
    }, [items])

    useEffect(() => {
        if(playersData.data.fp.name && playersData.data.sp.name) {
            setTimeout(() => {
                let {fp, sp} = playersData.data;

                choosePlayer({fp, sp});
            }, 100)
        }
    }, [playersData, choosePlayer])

    const addDataToApp = (data) => {
        if(playersData.data.fp.name) {
            setPlayersData(prev => ({
                data: {
                    ...prev.data,
                    sp: {
                        ...data
                    }
                }
            }))
        } else {
            setPlayersData(prev => ({
                data: {
                    ...prev.data,
                    fp: {
                        ...data
                    }
                },
                player: 'second'
            }))
        }
    }   

    const showPlayers = items.map((i, index) => {
        let img = i.sprites[1]

        return (
            <div key={index} className='Player' onClick={() => addDataToApp(i)}>
                <Animator sprite={img} width={i.main.w} height={i.main.h} fps={i.main.fps}/>

                <p>{i.name}</p>
            </div>
        )
    });

    return (
        <div className='Menu-choose'>
            <div className='Menu-body'>
                <div className='Menu-title'>
                    Choose a {playersData.player} Player
                </div>

                <div className='Menu-list'>
                    {
                        items.length && showPlayers
                    }
                </div>
            
                <div className='Menu-close-btn' onClick={() => changeChooseMode()}>
                    <img src={'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png'} alt="X"/>
                </div>
            </div>
        </div>
    )
}