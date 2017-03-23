const Sound  = require('react-native-sound');
const config = require('./config');

const files = [
  'bombwhistle.m4a', // egg drop
  'bugles.m4a',      // high score surpassed
  'ding.m4a',        // bullseye
  'fart.m4a',        // game over
  'multiplier.m4a',  // multiplier
  'splat.m4a',       // hit
  'woohoo.m4a',      // game over high score
  'youdabest.m4a',   // victory
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

console.log('Exporting', Object.keys(sounds));

function noop() {}

export default sounds
