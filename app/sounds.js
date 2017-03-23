const Sound = require('react-native-sound');

const files = [
  'bombwhistle.m4a',
  'fart.m4a',
  'splat.m4a',
]

const sounds = {}
files.forEach((filename) => {
  const name = filename.split('.')[0];
  sounds[name] = new Sound(filename, Sound.MAIN_BUNDLE, (err) => {
    if( err ) {
      console.error(err);
      return;
    }
  })
})

export default sounds
