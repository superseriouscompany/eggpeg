const DeviceInfo = require('react-native-device-info')

const config = {
  winDelay:  1000,
  lossDelay: 200,
  bullet: {
    delay:  3000,
    linger: 100,
  },
  chamber: 3,
  sizes: {
    target: 20,
    shadow: 26,
    bullet: 7,
  },
  score: {
    max: 100,
    penalty: 2,
  },
}

if( DeviceInfo.isEmulator() ) {
  config.winDelay     = 0;
  config.lossDelay    = 0;
  config.bullet.delay = 0;
}

export default config
