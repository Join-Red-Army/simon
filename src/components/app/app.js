import React, {Component} from 'react';
import './app.css';

import ButtonTile from '../button-tile/button-tile';


export default class App extends Component {
  state = {
    sample: [1, 2, 3],
    repeat: []
  };

  // пользователь жмёт на кнопки
  onClickButton = (id) => {
    this.setState( ({ repeat }) => {
      const newRepeat = [...repeat, id];
      if (newRepeat.length === this.state.sample.length) {
        console.log('!!!');
      } 
      // здесь выполнить проверку
      console.log(newRepeat);
      return {repeat: newRepeat}
    })
  }

  playSample() {
    this.setState( ({sample}) => {
      const newSample = [...sample, 4];
      newSample.forEach(el => console.log(el));
    } );
  }


  render() {
    return(
      <ButtonTile onClickButton={this.onClickButton}/>
    );
  }

};
