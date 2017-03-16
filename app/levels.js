import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const xcenter    = width / 2;
const ycenter    = height / 2;

const {colors}   = require('./styles/base')

const levels = [
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
    color: colors.purple,
    hint: 'Tap the target to drop an egg on it.',
  },
  {
    name: 'Big line',
    targets: [
      {
        width: 200,
        points: [
          { x: xcenter, y: ycenter - 200 },
          { x: xcenter, y: ycenter + 200 },
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
    hint: 'Anticipate the movement.',
  },
  {
    name: 'Big line diagonal',
    targets: [
      {
        width: 200,
        points: [
          { x: 0, y: 0 },
          { x: width, y: height },
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
    hint: 'Targets move in many directions.',
  },
  {
    name: 'Big square',
    targets: [
      {
        width: 200,
        points: [
          { x: xcenter, y: 0 },
          { x: width, y: 0 },
          { x: width, y: height },
          { x: 0, y: height },
          { x: 0, y: 0 },
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
    hint: 'Watch for patterns.'
  },
  {
    name: 'Big double',
    targets: [
      {
        width: 200,
        points: [
          { x: 0, y: ycenter },
          { x: width, y: ycenter },
        ],
        velocity: 1,
      },
      {
        width: 200,
        points: [
          { x: width, y: ycenter },
          { x: 0, y: ycenter },
        ],
        velocity: 1,
      },
    ],
    color: colors.purple,
    hint: 'Hitting two targets doubles the score',
  },
  {
    name: 'vibrator',
    targets: [
      {
        points: [
          { x: xcenter - 10, y: ycenter },
          { x: xcenter + 10, y: ycenter },
        ],
        velocity: .5,
    }
    ],
    color: colors.purple,
  },
  {
    name: 'two headed vibrator',
    targets: [
      {
        points: [
          { x: xcenter - 50, y: ycenter - 10 - 100},
          { x: xcenter - 50, y: ycenter + 10 - 100},
        ],
        velocity: .5,
      },
      {
        points: [
          { x: xcenter + 50, y: ycenter - 10 + 100},
          { x: xcenter + 50, y: ycenter + 10 + 100},
        ],
        velocity: .5,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Solo slow',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: width, y: ycenter }
        ],
        velocity: .5,
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
    name: 'three headed vibrator',
    targets: [
      {
        points: [
          { x: xcenter - 50, y: ycenter - 10 - 100},
          { x: xcenter - 50, y: ycenter + 10 - 100},
        ],
        velocity: .5,
      },
      {
        points: [
          { x: xcenter - 10, y: ycenter },
          { x: xcenter + 10, y: ycenter },
        ],
        velocity: .5,
      },
      {
        points: [
          { x: xcenter + 50, y: ycenter - 10 + 100},
          { x: xcenter + 50, y: ycenter + 10 + 100},
        ],
        velocity: .5,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'Solo',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: width, y: ycenter }
        ],
        velocity: 1,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'hyperactive brother',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: width, y: ycenter },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter, y: ycenter },
        ],
        velocity: 0,
      },
    ],
    color: colors.purple,
  },
  {
    name: 'linked',
    targets: [
      {
        points: [
          { x: 0, y: ycenter },
          { x: width, y:ycenter },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: config.sizes.target, y: ycenter },
          { x: width, y:ycenter },
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
          { x: 0, y: ycenter },
          { x: width, y: ycenter },
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter, y: ycenter - (width - config.sizes.target) / 2},
          { x: xcenter, y: ycenter + (width - config.sizes.target) / 2},
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
          { x: 0, y: 0 },
          { x: width, y: 0 },
          { x: width, y: height },
          { x: 0, y: height },
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
          { x: width, y: ycenter },
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
          { x: width, y: ycenter },
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
          { x: width, y: ycenter}
        ],
        velocity: 1,
      },
      {
        points: [
          { x: 20, y: ycenter },
          { x: width, y: ycenter },
          { x: 0, y: ycenter },
        ],
        velocity: 2,
      }
    ],
    color: colors.purple,
  },
  {
    name: 'X Marks the Spot',
    targets: [
      {
        points: [
          { x: xcenter - 100, y: ycenter - 100 },
          { x: xcenter + 100, y: ycenter + 100 }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter + 100, y: ycenter - 100 },
          { x: xcenter - 100, y: ycenter + 100 }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter - 100, y: ycenter + 100 },
          { x: xcenter + 100, y: ycenter - 100 }
        ],
        velocity: 1,
      },
      {
        points: [
          { x: xcenter + 100, y: ycenter + 100 },
          { x: xcenter - 100, y: ycenter - 100 }
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
          { x: 0, y: height },
          { x: width, y: 0},
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

export default levels.map((l) => {
  return {
    ...l,
    targets: l.targets.map((t) => {
      const radius = (t.width || config.sizes.target)/2
      t.points = t.points.map((p) => {
        p.x = Math.max(radius, p.x);
        p.x = Math.min(width - radius, p.x);
        p.y = Math.max(50 + radius, p.y);
        p.y = Math.min(height - radius, p.y)
        return p
      })
      return t
    })
  }
})

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
