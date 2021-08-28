import green from './audio-files/1.mp3';
import red from './audio-files/2.mp3';
import yellow from './audio-files/3.mp3';
import blue from './audio-files/4.mp3';

const audioFiles = {
  1: green,
  2: red,
  3: yellow,
  4: blue
};


function playAudio(id) {
    new Audio(audioFiles[id]).play();
};

export default playAudio;