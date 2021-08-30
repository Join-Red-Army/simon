import React, { Component } from 'react';
import './score-title.css';

export default class ScoreTitle extends Component {
  render() {
    const { score } = this.props;
    return <div className='score-title score' id='ScoreTitle'>{score}</div>;
  }
}