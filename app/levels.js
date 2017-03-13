import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const xcenter    = (width - config.sizes.target)  / 2;
const ycenter    = (height - config.sizes.target) / 2;
const bottomEdge = height - config.sizes.target / 2;
const rightEdge  = width - config.sizes.target / 2;
const leftEdge   = config.sizes.target / 2;
const top        = 50

const {colors}   = require('./styles/base')

export default [
  {
    name: 'Stationary',
    targets: [
      {
        width: 200,
        points: [
          { x: xcenter, y: ycenter },
        ],
        velocity: 0,
      },
    ],
    color: 'white'
  },
  {
    name: 'Slow line',
    targets: [
      {
        points: [
          { x: xcenter, y: ycenter - 50 },
          { x: xcenter, y: ycenter + 50 },
        ],
        velocity: .1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Slow triangle',
    targets: [
      {
        points: [
          { x: xcenter - 50, y: ycenter + 25 * Math.sqrt(3)},
          { x: xcenter, y: ycenter - 25 * Math.sqrt(3) },
          { x: xcenter + 50, y: ycenter + 25 * Math.sqrt(3)},
        ],
        velocity: .3,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Slow Stairs',
    targets: [
      {
        points: steps({x: xcenter - 100, y: ycenter - 100, distance: 20, steps: 10}),
        velocity: .5,
      }
    ],
    color: colors.purple
  },
  {
    name: 'Solo',
    targets: [
      {
        points: [
          { x: leftEdge, y: ycenter },
          { x: rightEdge, y: ycenter }
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Slow Meeting',
    targets: [
      {
        points: [
          { x: xcenter - 100, y: ycenter - 50 },
          { x: xcenter - 5,   y: ycenter - 50 },
          { x: xcenter - 5,   y: ycenter + 50, velocity: 0.3 },
          { x: xcenter - 100, y: ycenter + 50 },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter + 100, y: ycenter - 50 },
          { x: xcenter + 5,   y: ycenter - 50 },
          { x: xcenter + 5,   y: ycenter + 50, velocity: 0.3 },
          { x: xcenter + 100, y: ycenter + 50 },
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Linked',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: rightEdge, y:ycenter },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: 15, y: ycenter },
          { x: rightEdge, y:ycenter },
          { x: 0, y: ycenter },
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Crossing',
    targets: [
      {
        points: [
          { x: leftEdge, y: ycenter },
          { x: rightEdge, y: ycenter },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter, y: ycenter - rightEdge / 2},
          { x: xcenter, y: ycenter + rightEdge / 2},
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Whole Phone',
    targets: [
      {
        points: [
          { x: 0, y: top },
          { x: rightEdge, y: top },
          { x: rightEdge, y: bottomEdge },
          { x: 0, y: bottomEdge },
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Concentric Box',
    targets: [
      {
        points: concentric({x: xcenter, y: ycenter, step: 20, max: 200}),
        velocity: 1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Jagged Edge',
    targets: [
      {
        points: backtrack([
          { x: xcenter - 150, y: ycenter - 100 },
          { x: xcenter - 100, y: ycenter + 100 },
          { x: xcenter - 50, y: ycenter - 100 },
          { x: xcenter, y: ycenter + 100 },
          { x: xcenter + 50, y: ycenter - 100 },
          { x: xcenter + 100, y: ycenter + 100 },
          { x: xcenter + 150, y: ycenter - 100 },
        ]),
        velocity: 1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Fast Guy',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: rightEdge, y: ycenter },
        ],
        velocity: 2,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'Fast Meeting',
    targets: [
      {
        points: [
          { x: 0,       y: ycenter },
          { x: xcenter, y: ycenter, velocity: 2 },
        ],
        velocity: 0.5,
      },
      {
        points: [
          { x: rightEdge, y: ycenter },
          { x: xcenter,   y: ycenter, velocity: 2},
        ],
        velocity: 0.5,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Argyle',
    targets: [
      {
        points: backtrack([
          { x: xcenter - 150, y: ycenter - 100 },
          { x: xcenter - 100, y: ycenter + 100 },
          { x: xcenter - 50, y: ycenter - 100 },
          { x: xcenter, y: ycenter + 100 },
          { x: xcenter + 50, y: ycenter - 100 },
          { x: xcenter + 100, y: ycenter + 100 },
          { x: xcenter + 150, y: ycenter - 100 },
        ]),
        velocity: 1,
      },
      {
        points: backtrack([
          { x: xcenter - 150, y: ycenter + 100 },
          { x: xcenter - 100, y: ycenter - 100 },
          { x: xcenter - 50, y: ycenter + 100 },
          { x: xcenter, y: ycenter - 100 },
          { x: xcenter + 50, y: ycenter + 100 },
          { x: xcenter + 100, y: ycenter - 100 },
          { x: xcenter + 150, y: ycenter + 100 },
        ]),
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Star of David',
    targets: [
      {
        points: [
          { x: xcenter - 50, y: ycenter - 10 + 25 * Math.sqrt(3)},
          { x: xcenter, y: ycenter - 10 - 25 * Math.sqrt(3) },
          { x: xcenter + 50, y: ycenter - 10 + 25 * Math.sqrt(3)},
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter + 50, y: ycenter + 10 - 25 * Math.sqrt(3)},
          { x: xcenter - 50, y: ycenter + 10 - 25 * Math.sqrt(3)},
          { x: xcenter, y: ycenter + 10 + 25 * Math.sqrt(3) },
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Two Speed',
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
    ],
    color: colors.purple,
  },
  {
    name: 'Stairs',
    targets: [
      {
        points: steps({x: xcenter - 100, y: ycenter - 100, distance: 20, steps: 10}),
        velocity: 1,
      },
      {
        points: [
          {x: xcenter - 190, y: ycenter + 190},
          {x: xcenter + 190, y: ycenter - 190},
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'X Marks the Spot',
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
    ],
    color: colors.purple,
  },
  {
    name: 'Superfast',
    targets: [
      {
        points: [
          { x: 0, y: bottomEdge },
          { x: rightEdge, y: top},
        ],
        velocity: 3,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'The Santi Special',
    targets: [
      {
        points: [
          { x: xcenter - 50, y: ycenter },
          { x: xcenter - 50, y: ycenter - 50 },
          { x: xcenter, y: ycenter - 50 },
          { x: xcenter, y: ycenter }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter - 50, y: ycenter },
          { x: xcenter - 50, y: ycenter + 50 },
          { x: xcenter, y: ycenter + 50 },
          { x: xcenter, y: ycenter }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter, y: ycenter },
          { x: xcenter, y: ycenter - 25 },
          { x: xcenter + 125, y: ycenter - 25 },
          { x: xcenter + 125, y: ycenter + 25 },
          { x: xcenter, y: ycenter + 25 },
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
  }
]

function concentric(opts) {
  const {x, y, step, max} = opts
  let points = []
  for( var i = step; i < max; i+= step ) {
    points = points.concat([
      { x: x - i, y: y - i },
      { x: x + i, y: y - i },
      { x: x + i, y: y + i },
      { x: x - (i+step), y: y + i },
    ])
  }

  for( var i = 0; i < 20; i++ ) {
    points = points.concat([
      { x: x - max, y: y - max },
      { x: x + max, y: y - max },
      { x: x + max, y: y + max },
      { x: x - max, u: y + max },
    ])
  }

  return points
}

function steps(opts) {
  let points = [{x: opts.x, y: opts.y}]
  let xMove = true;
  for( var i = 0; i < opts.steps * 2; i++ ) {
    var lastPoint = points[points.length - 1]
    if( xMove ) {
      points.push({
        x: lastPoint.x + opts.distance,
        y: lastPoint.y
      })
    } else {
      points.push({
        x: lastPoint.x,
        y: lastPoint.y + opts.distance
      })
    }
    xMove = !xMove
  }

  const stepsBack = points.slice(1).reverse();
  stepsBack.shift()
  points = points.concat(stepsBack);
  return points;
}

function backtrack(points) {
  const stepsBack = points.slice(1).reverse();
  stepsBack.shift()
  return points.concat(stepsBack)
}
