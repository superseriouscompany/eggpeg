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
    shadow: 100,
    bullet: 7,
  },
  multiplier: {
    multihit: 2,
  },
  gravity: 4.5,//9.80665,
  countdown: 20, // game over countdown timer
  startingLevel: __DEV__ ? 'Stationary' : 'Stationary',
}

if( DeviceInfo.isEmulator() ) {
  config.winDelay     = 0;
  config.lossDelay    = 0;
  config.bullet.delay = 3000;
}

export default config

export function changeConfig(cfg) {
  Object.assign(config, cfg)
}
