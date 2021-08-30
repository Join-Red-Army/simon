import React, {Component} from 'react';
import './app.css';

// services
import playAudio from '../../services/play-audio';
import getRandomNum from '../../services/get-random-num/get-random-num';
import Mask from '../mask';

// components
import ButtonTile from '../button-tile/button-tile';
import NewGame from '../new-game';
import ScoreTitle from '../score-title/score-title';

export default class App extends Component {
  state = {
    sampleOrder: [],
    repeatOrder: [],
    score: 0,
    isFrozen: false,
    isGameRunning: false,
    isMaskShowing: false,
    error: false
  };

  // componentDidMount() {
  // }


  // звук и визуал кнопки при клике 
  makeButtonActive = (btn, id, ms = 400) => {
    playAudio(id);
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), ms); 
  }


  // функция обхода sampleOrder
  iterator = (i = 0, arr = this.state.sampleOrder) => {
    if (i === arr.length || !this.state.isGameRunning) {
      this.setState({ isFrozen: false }); 
      return;
    };
    this.setState({ isFrozen: true });
    const currentButton = document.body.querySelector(`.button-${arr[i]}`);
    this.makeButtonActive(currentButton, arr[i]);
    return setTimeout( () => this.iterator(i += 1), 500);
  };


  // добавление нового семпла в sampleOrder
  addNewSample = () => {
    this.setState( ({sampleOrder}) => {
      return {sampleOrder: [...sampleOrder, getRandomNum()]};
    });
  };
  

  // правильная ли нажата кнопка
  isInputCorrect = (arr) => {
    const checkedIndex = arr.length - 1;
    console.log(this.state.sampleOrder[checkedIndex], arr[checkedIndex]); // test
    return this.state.sampleOrder[checkedIndex] === Number(arr[checkedIndex]);
  };


  // подсветить очки и добавить затемняющую маску 
  showFinalScore = () => {
    this.setState((state) => {
      return {isMaskShowing: true}
    });
    [...document.body.getElementsByClassName('score')]
      .forEach((el) => el.classList.add('active'));
  };


  // сброс очков и последовательностей
  restartGame = (ms) => {
    setTimeout(() => {
      this.setState((state) => {
        return {
          isGameRunning: false,
          isFrozen: false,
          isMaskShowing: false,
          score: 0,
          sampleOrder: [],
          repeatOrder: []
        }
      })
    }, ms);
  };


  // пользователь нажимает на цветную кнопку
  onClickButton = (ev, id) => {
    if (this.state.isFrozen) return;

    this.makeButtonActive(ev.target, id, 300);
    if (!this.state.isGameRunning) return;

    const newRepeatOrder = [...this.state.repeatOrder, id];

    if (!this.isInputCorrect(newRepeatOrder)) {
      console.log('input incorrect');
      this.showFinalScore();
      this.restartGame(2000);
      return;
    };

    this.setState( (state) => {
      return { repeatOrder: newRepeatOrder }
    });

    if (this.state.sampleOrder.length === newRepeatOrder.length) {
      console.log('new round');
      this.setState( (state) => {
        return { repeatOrder: [], score: this.state.sampleOrder.length }
      });
      
      setTimeout(
        () => {
          this.addNewSample();
          this.iterator();
        },
        1000
      );
    };

  };

  
  launchNewGame = () => {
    // получить первые 3 семпла для начала игры
    let startedSamples = [];
    for (let i = 0; i < 3; i += 1) {
      startedSamples.push(getRandomNum());
    }

    this.setState( (state) => {
      return { 
        isGameRunning: true,
        sampleOrder: startedSamples,
        repeatOrder: []
      };
    });
    
    setTimeout(() => this.iterator(), 500);
  }


  render() {
    return(
      <div>
        <ButtonTile onClickButton={this.onClickButton}/>
        
        { this.state.isGameRunning ? 
          <ScoreTitle score={this.state.score}/> 
          :
          <NewGame launchNewGame={() => this.launchNewGame}/> }

        {this.state.isMaskShowing ? <Mask /> : null}

      </div>
    );
  }

};
