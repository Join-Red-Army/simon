import React from 'react';
import './button.css';


const Button = (props) => {
  const {buttonIndex, onClickButton} = props;

  return (
    <div className={`button button-${buttonIndex}`} 
    // onClick={(ev) => onClickButton(ev, buttonIndex)}
    // onPointerUp={(ev) => onClickButton(ev, buttonIndex)}
    onPointerDown={(ev) => onClickButton(ev, buttonIndex)}
    >
    </div>
  );
}

export default Button;