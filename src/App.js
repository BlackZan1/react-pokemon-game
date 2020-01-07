import React from 'react';
import Sky from './Components/Sky/Sky.jsx';
import Ground from './Components/Ground/Ground.jsx';
import Hero from './Components/Hero/Hero.jsx';
import Menu from './Components/Menu/Menu.jsx';
import Fruits from './Components/Fruits/Fruits.jsx';
// Audio
import EatAudio from './audio/eat.mp3';
import GameBg from './audio/bg.mp3';
import MenuBg from './audio/menu.mp3';
// static
import groundImg from './img/bg-bottom.png';
import './App.css';

const appWidth = 1500, appHeight = 700;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeDataPlayer = this.changeDataPlayer.bind(this);
    this.choosePlayer = this.choosePlayer.bind(this);
    this.fruits = [];
  }

  componentDidUpdate() {
    let {gameMode, menuMode, music} = this.state;

    this.checkCollideWithFruit();

    if(gameMode && !music.play) {
      this.setState({
        music: {
          play: true,
          audio: new Audio(GameBg)
        }
      })
    }

    if(menuMode && !music.play) {
      this.setState({
        music: {
          play: true,
          audio: new Audio(MenuBg)
        }
      })
    }

    music.play && this.playMusic();
  }

  componentDidMount() {
    let {menuMode, music} = this.state;

    if(menuMode) {
      this.setState({
        music: {
          play: true,
          audio: new Audio(MenuBg)
        }
      })
    }

    music.play && this.playMusic();
  }

  state = {
    clouds: 10,
    gameMode: false,
    menuMode: true,
    music: {
      play: false,
      audio: ''
    },
    score: {
      firstPlayer: 0,
      secondPlayer: 0
    },
    basket: [],
    dataPlayers: {
      firstPlayer: {
        x: 30,
        y: 65,
        RightSide: true, // true - right side, false - left side
        moving: false,
        data: {}
      },
      secondPlayer: {
          x: appWidth - 90,
          y: 65,
          RightSide: false, // true - right side, false - left side
          moving: false,
          data: {}
      },
    }
  }

  playMusic() {
    let {music} = this.state;

    music.play && music.audio.play();

    return <></>
  }

  changeDataPlayer(data) {
    this.setState({
      dataPlayers: data,
      gameMode: true
    })
  }

  choosePlayer(data) {
    let {fp, sp} = data;

    this.setState(prev => ({
      dataPlayers: {
        firstPlayer: {
          ...prev.dataPlayers.firstPlayer,
          x: 30,
          data: {...fp}
        },
        secondPlayer: {
          ...prev.dataPlayers.secondPlayer,
          x: appWidth - 90,
          data: {...sp}
        }
      },
      menuMode: false,
      music: {
        play: false,
        audio: prev.music.audio.pause()
      }
    }))
  }

  checkCollideWithFruit() {
    this.fruits = [...document.querySelectorAll('#fruit')];
    
    setInterval(() => {
      this.fruits.forEach((item, index) => {
        let left = parseInt(item.style.left, 10);
        let bottom = parseInt(item.style.bottom, 10);
        let firstXDiv = left - this.state.dataPlayers.firstPlayer.x;
        let secondXDiv = left - this.state.dataPlayers.secondPlayer.x;

        if(Math.abs(firstXDiv) <= 65 &&
          (this.state.dataPlayers.firstPlayer.y + 30) >= bottom) {

            this.setState(prev => ({
              score: {
                ...prev.score,
                firstPlayer: prev.score.firstPlayer + 100
              },
              basket: [...prev.basket, index]
            }))

            item.style.bottom = appHeight + 'px';

            new Audio(EatAudio).play();

            return;
        }

        if(Math.abs(secondXDiv) <= 65 &&
          (this.state.dataPlayers.secondPlayer.y + 30) >= bottom) {

            this.setState(prev => ({
                score: {
                  ...prev.score,
                  secondPlayer: prev.score.secondPlayer + 100
                },
                basket: [...prev.basket, index]
              }))

            item.style.bottom = appHeight + 'px';

            new Audio(EatAudio).play();

            return;
        }
      })
    }, 650)
  }

  replayGame() {
    this.setState({
      gameMode: false,
      basket: [],
      score: {
        firstPlayer: 0,
        secondPlayer: 0
      }
    })
  }

  exitGame() {
    this.setState(prev => ({
      gameMode: false,
      basket: [],
      score: {
        firstPlayer: 0,
        secondPlayer: 0
      },
      menuMode: true,
      music: {
        play: false,
        audio: prev.music.audio.pause()
      }
    }))
  }

  render() {
    let {clouds, gameMode, score, menuMode} = this.state;
    let draw = score.firstPlayer === score.secondPlayer;
    let win = score.firstPlayer > score.secondPlayer;

    return <>
      {
        !menuMode ?
        <div className="App" style={{width: appWidth, height: appHeight}}>
            {!gameMode && <div className='App-big-title'>
              <p>Press to start</p>
            </div> }

            {this.state.basket.length === this.fruits.length && gameMode && this.state.basket.length >= 1 &&
              <>
                <div className='App-big-title'>
                  {draw ? <p>It's a DRAW</p> : (
                    win ? <p>Winner is first Player</p> : <p>Winner is second Player</p> 
                  )}
                  
                  {draw || score.firstPlayer > win ? (
                    <div className='App-replay'> 
                      <button onClick={() => this.replayGame()}>Replay</button>
                      <button onClick={() => this.exitGame()}>Exit</button>
                    </div>
                  ) : null }
                </div>
              </>
            }

            <Sky clouds={clouds} appWidth={appWidth} appHeight={appHeight} />

            <Ground image={groundImg} appWidth={appWidth} bushCount={13} treeCount={5} gameMode={gameMode} />

            <Hero dataPlayers={this.state.dataPlayers} appWidth={appWidth} changeDataPlayer={this.changeDataPlayer} />

            {gameMode && <Fruits appWidth={appWidth} appHeight={appHeight} />}

            {gameMode && 
              <>
                <h3 className='fs'>First player {this.state.score.firstPlayer}</h3>
                <h3 className='ss'>Second player {this.state.score.secondPlayer}</h3>
              </>
            }
        </div>
        :
        <Menu choosePlayer={this.choosePlayer} />
        }

        {
          this.playMusic()
        }
    </>
  }
}

export default App;
