import React, {Component} from 'react';
import './app.css';

import getSound from '../../services/audio-signal';
import getRandomNum from '../../services/get-random-num/get-random-num';
import ButtonTile from '../button-tile/button-tile';


export default class App extends Component {
  state = {
    sampleOrder: [1, 2, 3],
    repeatOrder: [],
    isFrozen: false,
    error: false
  };

  componentDidMount() {
    setTimeout(() => this.iterator(), 1000);
  }


  // звук и визуал кнопки клике 
  makeButtonActive = (btn, id, ms = 400) => {
    getSound(id);
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), ms); 
  }


  // функция обхода sampleOrder
  iterator = (i = 0, arr = this.state.sampleOrder) => {
    if (i === arr.length) return;
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
    const newRepeatOrder = [...this.state.repeatOrder, id];
    
    if (!this.isInputCorrect(newRepeatOrder)) {
      console.log('input incorrect');
      // return ошибка, очистить всё
    };

    this.setState( ({ repeatOrder }) => {
      return { repeatOrder: newRepeatOrder }
    });

    if (this.state.sampleOrder.length === newRepeatOrder.length) {
      console.log('new round');
      this.setState( ({ repeatOrder }) => {
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


  render() {
    return(
      <div>
        <ButtonTile onClickButton={this.onClickButton}/>
      </div>
    );
  }

};
