import React, {Component} from 'react';
import './app.css';

// services
import getSound from '../../services/audio-signal';
import getRandomNum from '../../services/get-random-num/get-random-num';

// components
import ButtonTile from '../button-tile/button-tile';
import NewGame from '../new-game';

export default class App extends Component {
  state = {
    sampleOrder: [],
    repeatOrder: [],
    isFrozen: false,
    isGameRunning: false,
    error: false
  };

  componentDidMount() {
    // setTimeout(() => this.iterator(), 1000);
  }


  // звук и визуал кнопки клике 
  makeButtonActive = (btn, id, ms = 400) => {
    getSound(id);
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), ms); 
  }


  // функция обхода sampleOrder
  iterator = (i = 0, arr = this.state.sampleOrder) => {
    if (i === arr.length || !this.state.isGameRunning) return;
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
    console.log(this.state.sampleOrder[checkedIndex], arr[checkedIndex]);
    return this.state.sampleOrder[checkedIndex] == arr[checkedIndex];
  }


  onClickButton = (ev, id) => {
    this.makeButtonActive(ev.target, id, 300);
    if (!this.state.isGameRunning) return;

    const newRepeatOrder = [...this.state.repeatOrder, id];
    
    if (!this.isInputCorrect(newRepeatOrder)) {
      console.log('input incorrect');
      this.setState((state) => {
        return {
          isGameRunning: false,
          sampleOrder: []
        }
      })
      // return ошибка, очистить всё
    };

    this.setState( (state) => {
      return { repeatOrder: newRepeatOrder }
    });

    if (this.state.sampleOrder.length === newRepeatOrder.length) {
      console.log('new round');
      this.setState( (state) => {
        return { repeatOrder: [] }
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
        sampleOrder: startedSamples
      };
    });
    
    setTimeout(() => this.iterator(), 500);

  }

  render() {
    const newGame = this.state.isGameRunning ? null : 
    <NewGame launchNewGame={() => this.launchNewGame}/>;

    return(
      <div>
        <ButtonTile onClickButton={this.onClickButton}/>
        { newGame }
      </div>
    );
  }

};
