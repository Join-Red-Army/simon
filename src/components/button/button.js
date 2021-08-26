import React from 'react';
import './button.css';

const Button = (props) => {
  const {buttonIndex, onClickButton} = props;

  return (
    <div className={`button button-${buttonIndex}`} 
    onClick={(ev) => onClickButton(ev, buttonIndex)}
    >
      123
    </div>
  );
}

export default Button;