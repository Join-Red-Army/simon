import path1 from './1.mp3';
import path2 from './2.mp3';
import path3 from './3.mp3';
import path4 from './4.mp3';

const audioFiles = {
  1: path1,
  2: path2,
  3: path3,
  4: path4,
}

const AudioSignal = (id) => {
  let signal = document.createElement('audio');
  signal.src = audioFiles[id];
  signal.autoplay = true;
  document.body.append(signal);
  setTimeout(() => signal.remove(), 1000)
  return;
};

export default AudioSignal;