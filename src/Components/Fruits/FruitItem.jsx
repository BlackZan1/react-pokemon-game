import React, {useState, useEffect} from 'react';
import './Fruits.css';

const FruitItem = ({sprite, x, appHeight, timeout}) => {
    let [y, setY] = useState(appHeight + 50);
    let [dropMode, setDropMode] = useState(false);

    let borderY = (y) => {
        if(y < 70) {
            return 60;
        } else {
            return y;
        }
    }

    useEffect(() => {
        if(dropMode) {
            let ticker = setInterval(() => {
                setY(borderY(y - 50))
            }, 500);

            return () => {
                clearInterval(ticker);
                ticker = null;
            }
        }
    }, [y, dropMode]);

    useEffect(() => {
        setTimeout(() => {
            setDropMode(true);
        }, timeout);
    }, [dropMode, timeout]);

    return <img id='fruit' className={'fruit'} src={sprite} style={{left: x, bottom: y}} alt={'I am a fruit!'}/>
}

export default FruitItem;