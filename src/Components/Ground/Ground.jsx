import React from 'react';
import TreeImg from '../../img/tree.png';
import BushImg from '../../img/bush.png';

export default class Ground extends React.PureComponent {
    componentDidMount() {
        let {bushCount, treeCount} = this.props;

        this.showPlants(bushCount, treeCount);
    }

    state = {
        plants: [],
    }

    showPlants(bushCount, treeCount) {
        let buffer = [];

        for(let x = 0; x < bushCount; x++) {
            let item = {};

            item.y = 50;
            item.type = 'bush';
            item.x = Math.floor(Math.random() * (this.props.appWidth - 150));
            item.width = 150;
            item.zIndex = 99;

            buffer.push(item);
        }

        for(let x = 0; x < treeCount; x++) {
            let item = {};

            item.y = 65;
            item.type = 'tree';
            item.x = Math.floor(Math.random() * (this.props.appWidth - 300));
            item.width = 300;
            item.zIndex = 88;

            buffer.push(item);
        }

        this.setState({
            plants: buffer,
        })
    }

    render() {
        console.log(this.props.image)

        return <div className='Ground' style={{background: `url(${this.props.image})`, width: this.props.appWidth, height: 80, position: 'absolute', bottom: 0, zIndex: 999}}>
            {
                this.state.plants.map(plant => {
                    switch(plant.type) {
                        case 'bush':
                            plant.image = BushImg;
                            break;
                        case 'tree':
                            plant.image = TreeImg;
                            break;
                        default:
                            plant.image = BushImg;
                    }

                    return <img src={plant.image} alt="Loading..." style={{position: "absolute", bottom: plant.y, left: plant.x, width: plant.width, zIndex: plant.zIndex, filter: 'drop-shadow(0px 0px 2px #323232)'}}/>
                })
            }
        </div>
    }
}