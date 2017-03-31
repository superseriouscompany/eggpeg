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
    // gonna leave 69s in here for timings to change
    levelIn:               369,
    levelOut:              169,
    gameOverIn:            169,
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
  playSounds: false,
  startingScene: __DEV__ ? 'Start' : 'Start',
  startingLevel: __DEV__ ? 'Stationary' : 'Stationary',
  skipDemo:      __DEV__ ? true : false,
}

if( DeviceInfo.isEmulator() ) {
  config.bullet.delay     = 0;
  config.playSounds       = false;
  config.lockLevel        = undefined;
  config.timings.levelIn  = 1;
  config.timings.levelOut = 1;
}

export default config

export function changeConfig(cfg) {
  Object.assign(config, cfg)
}
