import Sound  from 'react-native-sound'
import config from './config'

const files = [
  'bombwhistle.mp3', // egg drop
  'bugles.mp3',      // high score surpassed
  'ding.mp3',        // bullseye
  'splat.mp3',       // hit
  'whiff.mp3',       // miss
  'fart.mp3',        // game over
  'multiplier.mp3',  // multiplier
  'woohoo.mp3',      // game over high score
  'incrementer.mp3', // incrementing after multiplier

  'buttonTap.mp3',   // menu button tap
  'youdabest.wav',   // victory
  'musicMenu.wav',  // menu music
  'musicGame.wav',  // in-game music
]

const sounds = {}
files.forEach((filename) => {
  const name = filename.split('.')[0];
  if( config.playSounds ) {
    sounds[name] = new Sound(filename, Sound.MAIN_BUNDLE, (err) => {
      if( err ) {
        console.error(err);
        return;
      }
    })
  } else {
    sounds[name] = { play: noop, stop: noop, }
  }
})

function noop() {}

export default sounds
