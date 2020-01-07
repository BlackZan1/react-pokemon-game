import React from 'react';
import Clouds from './Clouds/Clouds.jsx';
import './Sky.css';

class Sky extends React.PureComponent {
    state = {
        clouds: []
    }

    componentDidMount() {
        this.addClouds(Math.round(Math.random() * this.props.clouds) + 3);
    }

    addClouds(count) {
        let buffer = [];

        for(let i = 0; i < count; i++) {
            let randW = Math.floor(Math.random() * 450) + 100;
            let randY = Math.floor(Math.random() * 450);
            let randDur = Math.floor(Math.random() * 14) + 5;
            buffer.push({width: randW, y: randY, dur: randDur});
        }

        this.setState((prevState) => {
            return {
                clouds: prevState.clouds.concat(buffer)
            }
        })
    }
    
    render() {
        return <div className='Sky' style={{width: this.props.appWidth, height: this.props.appHeight}}>

            {this.state.clouds.map(item => {
                return <Clouds key={Math.random()} width={item.width} y={item.y} dur={item.dur}/>
            })}

        </div>
    }
};

export default Sky;