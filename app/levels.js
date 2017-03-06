import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const xcenter    = (width - config.sizes.target)  / 2;
const ycenter    = (height - config.sizes.target) / 2;
const bottomEdge = height - config.sizes.target
const rightEdge  = width - config.sizes.target;
const top        = 50

export default [
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
          { x: rightEdge, y: ycenter },
        ],
        velocity: 1,
      },
    ]
  },
  {
    level: 3,
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: rightEdge, y: ycenter}
        ],
        velocity: 1,
      },
      {
        points: [
          { x: 20, y: ycenter },
          { x: rightEdge, y: ycenter },
          { x: 0, y: ycenter },
        ],
        velocity: 2,
      }
    ]
  },
  {
    level: 4,
    targets: [
      {
        points: [
          { x: 0, y: top },
          { x: rightEdge, y: bottomEdge }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: rightEdge, y: top },
          { x: 0, y: bottomEdge }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: 0, y: bottomEdge },
          { x: rightEdge, y: top }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: rightEdge, y: bottomEdge },
          { x: 0, y: top }
        ],
        velocity: 1,
      },
    ]
  },
]
