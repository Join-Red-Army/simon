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

let audioElement = new Audio();

function playAudio(id) {
  if (!audioElement.ended) {
    audioElement = new Audio(audioFiles[id]);
  }
  audioElement.play();
};


export default playAudio;

// старый код, который не работает в мобилках

// const AudioSignal = (id) => {
//   let signal = document.createElement('audio');
//   signal.src = audioFiles[id];
//   signal.autoplay = true;
//   document.body.append(signal);
//   setTimeout(() => signal.remove(), 1000)
//   return;
// };