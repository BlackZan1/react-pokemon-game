import React from 'react';
import Animator from 'react-sprite-animator';
import './Hero.css';

export default class Hero extends React.PureComponent {
    state = {
        firstPlayer: {...this.props.dataPlayers.firstPlayer},
        secondPlayer: {...this.props.dataPlayers.secondPlayer}
    }

    componentDidMount() {
        // event listener - i love it so much
        // i think games can't work without this event listener function
        document.addEventListener('keyup', (ev) => this.heroDirection(ev));
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.firstPlayer.x !== prevProps.dataPlayers.firstPlayer.x) {
            let {firstPlayer, secondPlayer} = this.state;

            console.log('render')

            this.props.changeDataPlayer({firstPlayer, secondPlayer})
        }
        if(this.state.secondPlayer.x !== prevProps.dataPlayers.secondPlayer.x) {
            let {firstPlayer, secondPlayer} = this.state;

            console.log('render')

            this.props.changeDataPlayer({firstPlayer, secondPlayer})
        }
    }

    // This algorithm simular like a snake border function
    borderLimitedX(x) {
        let {appWidth} = this.props;

        if(x >= appWidth - 90) return (appWidth - 90);
        else if(x <= 0) return 10;
        else return x;
    }

    borderLimitedY(y) {
        if(y >= (65 * 4)) {
            return 65;
        } else {
            return y;
        }
    }
    //------------------------------------------------------

    heroDirection(ev) {
        let run = null;

        // firstPlayer pos and direction
        // How it works
        // 1. event keyCode if will equal step 2 else return nothing
        // 2. need state data of player (there x, y and rightSide) go to step 3
        // 3. here we are! there is setTimeout() it need for changing moving to 'stay'
        // because if moving equals true hero will move infinitely
        // if 'stay' or another (i don't know why it's so easy :) ) for switch to move sprite 
        if(ev.keyCode === 39) {

            this.setState(prevState => {
                return {
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        x: this.borderLimitedX(prevState.firstPlayer.x + 100),
                        RightSide: true,
                        moving: true,
                    },
                    
                }
            })

            run = setTimeout(() => {
                this.setState(prevState => ({
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        moving: 'stay',
                    }
                }))
            }, 400);
        }
        if(ev.keyCode === 37) {

            this.setState(prevState => {
                return {
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        x: this.borderLimitedX(prevState.firstPlayer.x - 100),
                        RightSide: false,
                        moving: true,
                    }
                }
            })

            run = setTimeout(() => {
                this.setState(prevState => ({
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        moving: 'stay',
                    }
                }))
            }, 400);
        }

        if(ev.keyCode === 69) {

            this.setState(prevState => {
                return {
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        attack: true,
                    }
                }
            })

            setTimeout(() => {
                this.setState(prevState => ({
                    firstPlayer: {
                        ...prevState.firstPlayer,
                        attack: false,
                    }
                }))
            }, 500)
        }

        // Second player
        // Very simple change of hero position
        // Like firstPLayer
        if(ev.keyCode === 65) {

            this.setState(prevState => {
                return {
                    secondPlayer: {
                        ...prevState.secondPlayer,
                        x: this.borderLimitedX(prevState.secondPlayer.x - 100),
                        RightSide: false,
                        moving: true
                    },
                }
            })

            run = setTimeout(() => {
                this.setState(prevState => ({
                    secondPlayer: {
                        ...prevState.secondPlayer,
                        moving: 'stay'
                    }
                }))
            }, 400);
        }
        if(ev.keyCode === 68) {

            this.setState(prevState => {
                return {
                    secondPlayer: {
                        ...prevState.secondPlayer,
                        x: this.borderLimitedX(prevState.secondPlayer.x + 100),
                        RightSide: true,
                        moving: true
                    },
                }
            })

            run = setTimeout(() => {
                this.setState(prevState => ({
                    secondPlayer: {
                        ...prevState.secondPlayer,
                        moving: 'stay'
                    }
                }))
            }, 400);
        }
    }

    // how i works
    // 1. Like a hook (maybe)
    // 2. there are 4 parametres =>
    // state player data (this.state.firstPlayer), data needs for use ready width, height and fps special
    // for sprites config, className in this "hook" is array, because i think its very cool,
    // sprites is array too need for config sprite component
    // 3. switch by player.moving (it will be true or "stay")
    // 4. config component and return it to jsx space
    // SPACE!!!!!!!!!!! 
    showHero(playerPos, data, className, sprites) {
        //firstPlayer or secondPlayer
        let player = playerPos;
        let {move, attack, main} = data;

        switch(player.moving) {
            case true: //Walking
                return (
                    <div className={className[0]} style={{left: player.x, bottom: player.y ,transform: (player.RightSide ? 'scale(-1, 1)' : 'scale(1, 1)')}}>
                        <Animator sprite={sprites[0]} width={move.w} height={move.h} fps={move.fps}/>
                    </div> 
                );
            default: // Attack
                if(player.attack) {
                    return (
                        <div className={className[1]} style={{left: player.x, bottom: player.y ,transform: (player.RightSide ? 'scale(-1, 1)' : 'scale(1, 1)')}}>
                            <Animator sprite={sprites[2]} width={attack.w} height={attack.h} fps={attack.fps} style={{left: player.x, bottom: player.y ,transform: (player.RightSide ? 'scale(-1, 1)' : 'scale(1, 1)')}}/> 
                        </div>
                    );
                }

                else return ( // Main idle
                    <div className={className[2]} style={{left: player.x, bottom: player.y ,transform: (player.RightSide ? 'scale(-1, 1)' : 'scale(1, 1)')}}>
                        <Animator sprite={sprites[1]} width={main.w} height={main.h} fps={main.fps} style={{left: player.x, bottom: player.y ,transform: (player.RightSide ? 'scale(-1, 1)' : 'scale(1, 1)')}}/> 
                    </div>
                );
        }
    }

    render() {
        let { firstPlayer, secondPlayer } = this.state;

        return <>
            {
                this.showHero(
                    firstPlayer,
                    firstPlayer.data,
                    firstPlayer.data.classList,
                    firstPlayer.data.sprites
                )
            }

            {

                this.showHero(
                    secondPlayer,
                    secondPlayer.data,
                    secondPlayer.data.classList,
                    secondPlayer.data.sprites
                )          
            }
        </>
    }
}