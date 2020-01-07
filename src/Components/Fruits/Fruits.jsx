import React, { useState, useEffect, useCallback } from 'react';
// Fruits sprites
import apple from '../../img/items/fruits/apple.png';
import peach from '../../img/items/fruits/peach.png';
import cherry from '../../img/items/fruits/cherry.png';
import banana from '../../img/items/fruits/banana.png';
import lemon from '../../img/items/fruits/lemon.png';
import strawberry from '../../img/items/fruits/strawberry.png';
import watermelon from '../../img/items/fruits/watermelon.png';
import vine from '../../img/items/fruits/vine.png';
//
import FruitItem from './FruitItem';

export default (props) => {
    let fruits = [
        apple, peach, cherry, banana, lemon, strawberry, watermelon, vine
    ];
    let [dataItems, setDataItems] = useState([]);

    const dropFruits = () => {
        let items = [];

        for(let i = 0; i < Math.floor(Math.random() * 65) + 35; i++) {
            let x = Math.round(Math.random() * (props.appWidth - 200)) + 100;
            let timeout = (Math.floor(Math.random() * 45) + 2) * 1000;
            let sprite = fruits[Math.floor(Math.random() * fruits.length)];

            let obj = {
                sprite,
                x,
                timeout
            }

            items.push(obj);
        }

        setDataItems([...items]);
    }

    useEffect(() => {
        dropFruits();
    }, []);

    return <>
        {dataItems.map((i, index) => {
            return <FruitItem key={index} sprite={i.sprite} x={i.x} appHeight={props.appHeight} timeout={i.timeout}/>
        })}
    </>
}