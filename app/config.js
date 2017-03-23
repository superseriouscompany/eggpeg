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
    multiplierDelay:       1000,
    multiplierBetween:     500,
    rainbowDelay:          150,
    rainbow:               500,
    rainbowLeaveDuration:  150,
    rainbowLeaveDelay:     650,
    scoreIncrement:        525,
    scoreExplanationLeave: 500,
    targetGhost:           1750,
  },
  gravity: 0,//9.80665,
  countdown: 20, // game over countdown timer
  playSounds: false,
  startingLevel: __DEV__ ? 'Stationary' : 'Stationary',
}

if( DeviceInfo.isEmulator() ) {
  config.winDelay     = 0;
  config.lossDelay    = 0;
  config.bullet.delay = 0;
  config.playSounds   = false;
  config.lockLevel    = undefined;
}

export default config

export function changeConfig(cfg) {
  Object.assign(config, cfg)
}
