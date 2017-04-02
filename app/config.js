const DeviceInfo = require('react-native-device-info')

const config = {
  startingScene: __DEV__ ? 'Start' : 'Start',
  startingLevel: __DEV__ ? null : null,
  skipDemo:      __DEV__ ? false : false,
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
    dropIn:                1069,
    dropOut:               1069,
    levelIn:               250,
    levelOut:              450,
    lossDelay:             200,
    gameOverIn:            900,
    multiplierDelay:       1000,
    multiplierBetween:     500,
    progressIncrease:      400,
    rainbowDelay:          150,
    rainbow:               500,
    rainbowLeaveDuration:  150,
    rainbowLeaveDelay:     650,
    sceneDropIn:           500,
    sceneFadeIn:           1069,
    sceneRiseOut:          500,
    scoreIncrement:        525,
    scoreExplanationLeave: 500,
    worldIn:               250,
    worldOut:              250,
    worldBeatDelay:        2500,
    worldScoreDelay:       1000,
    worldPulse:            1750,
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
