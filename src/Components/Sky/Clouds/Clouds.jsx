import React from 'react';
import clouds from '../../../img/cloud.png';

export default (props) => {
    return (
        <img src={clouds} alt="//cloud//" style={{width:props.width, top:props.y, animationDuration:`${props.dur}s`}} className='Cloud'/>
    );
};