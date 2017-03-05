import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

export default [
  {
    level: 1,
    targets: [
      {
        x: (width - config.sizes.target) / 2,
        y: (height - config.sizes.target) / 2,
        xMax: width,
        velocity: 0,
      }
    ]
  },
  {
    level: 2,
    targets: [
      {
        x: 0,
        y: (height - config.sizes.target) / 2,
        xMax: width,
        velocity: 1,
      }
    ]
  },
  {
    level: 3,
    targets: [
      {
        x: 0,
        y: (height - config.sizes.target) / 2,
        xMax: width,
        velocity: 1,
      },
      {
        x: 20,
        y: (height - config.sizes.target) / 2,
        xMax: width,
        velocity: 2,
      },
    ]
  },
]
