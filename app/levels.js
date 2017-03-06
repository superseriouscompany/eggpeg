import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const xcenter = (width - config.sizes.target)  / 2
const ycenter = (height - config.sizes.target) / 2

export default [
  {
    level: 0,
    targets: [
      {
        points: [
          { x: 100, y: 100 },
          { x: 110, y: 110 },
          { x: 120, y: 110 },
          { x: 120, y: 120 },
        ],
        velocity: 1,
      },
    ]
  },
  {
    level: 1,
    targets: [
      {
        points: [
          { x: xcenter, y: ycenter },
        ],
        velocity: 0,
      },
    ]
  },
  {
    level: 2,
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: width, y: ycenter },
          { x: 0, y: ycenter },
        ],
        velocity: 1,
      },
    ]
  },
]
