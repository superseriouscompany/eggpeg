const Sound = require('react-native-sound');

Sound.setCategory('Playback');

const bombdrop = new Sound('bombdrop.wav', Sound.MAIN_BUNDLE, (err) => {
  if( err ) {
    console.error(err);
    return;
  }
})

export default bombdrop
