import React from 'react';

const AudioSignal = (props) => {
  const {src} = props;

  return (
    <audio src={src} type="audio/mpeg"></audio>
  );
}

export default AudioSignal;