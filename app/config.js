const DeviceInfo = require('react-native-device-info')

const config = {
  startingScene: __DEV__ ? 'Start' : 'Start',
  startingLevel: __DEV__ ? null : null,
  skipDemo:      __DEV__ ? true : false,
  bullet: {
    delay:  2800,
    linger: 100,
  },
  chamber: 3,
  sizes: {
    target: 40,
    shadow: 75,
    bullet: 7,
  },
  timings: {
    // gonna leave 69s in here for timings to change
    levelIn:               369,
    levelOut:              169,
    lossDelay:             200,
    gameOverIn:            900,
    multiplierDelay:       1000,
    multiplierBetween:     500,
    rainbowDelay:          150,
    rainbow:               500,
    rainbowLeaveDuration:  150,
    rainbowLeaveDelay:     650,
    scoreIncrement:        525,
    scoreExplanationLeave: 500,
    winDelay:              1000,
    targetGhost:           1750,
  },
  gravity: 0,//9.80665,
  playSounds: false,
}

if( DeviceInfo.isEmulator() ) {
  config.bullet.delay      = 0;
  // config.timings.winDelay  = 0;
  // config.timings.lossDelay = 0;
  // config.timings.levelIn   = 1;
  // config.timings.levelOut  = 1;
}

export default config

export function changeConfig(cfg) {
  Object.assign(config, cfg)
}
