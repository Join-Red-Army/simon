import React, {Component} from 'react';
import Button from '../button';
import './button-tile.css';

export default class ButtonTile extends Component {

  render() {
    const {onClickButton} = this.props;

    return (
      <div className="button-tile">
        <Button buttonIndex="1" onClickButton={onClickButton}/>
        <Button buttonIndex="2" onClickButton={onClickButton}/>
        <Button buttonIndex="3" onClickButton={onClickButton}/>
        <Button buttonIndex="4" onClickButton={onClickButton}/>
      </div>
    );
  }

}