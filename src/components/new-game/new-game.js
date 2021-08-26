import React, {Component} from 'react';
import './new-game.css';

export default class NewGame extends Component {
  render() {
    const {launchNewGame} = this.props;

    return(
      <div className='new-game'
      onClick={launchNewGame()}>
        играть
      </div>
    );
  }
}