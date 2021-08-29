import React, { Component } from 'react';
import './score-title.css';

export default class ScoreTitle extends Component {

  render() {
    const { score } = this.props;

    return (
      <div id='score-container'>
        <div className='score-title' id='ScoreTitle'>{score}</div>
        <div className='score-mask' id='ScoreTitle'></div>
      </div>
    );
  }
}