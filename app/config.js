const DeviceInfo = require('react-native-device-info')

const config = {
  winDelay:  1000,
  lossDelay: 200,
  bullet: {
    delay:  2800,
    linger: 100,
  },
  chamber: 3,
  scoreBonus: 1,
  sizes: {
    target: 40,
    shadow: 75,
    bullet: 7,
  },
  timings: {
    // TODO: move all timings here
    multiplierDelay:   1000,
    multiplierBetween: 500,
  },
  gravity: 0,//9.80665,
  countdown: 20, // game over countdown timer
  startingLevel: __DEV__ ? 'the santi special' : 'Stationary',
  debugBullseye: false,
}

if( DeviceInfo.isEmulator() ) {
  config.winDelay     = 0;
  config.lossDelay    = 0;
  config.bullet.delay = 0;
}

export default config

export function changeConfig(cfg) {
  Object.assign(config, cfg)
}
