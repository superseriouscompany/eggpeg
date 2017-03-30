import config from './config'

import { Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const xcenter    = width / 2;
const ycenter    = height / 2;

const {colors}   = require('./styles/base')

const worlds = [{
  name:   'Demo',
  color:  colors.green,
  levels: [
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
      hint: 'Hitting two targets doubles the score',
    },
  ],
}, {
  name: '1',
  color: colors.yellow,
  levels: [
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
    },
    {
      name: 'Slow Stairs',
      targets: [
        {
          points: steps({x: xcenter - 100, y: ycenter - 100, distance: 20, steps: 10}),
          velocity: .5,
        }
      ],
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
    },
  ],
},
{
  name: '2',
  color: colors.orange,
  locked: true,
  levels: [
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
    },
    {
      name: 'Circle',
      targets: [
        {
          points: circle(xcenter, ycenter, 80),
          velocity: 1,
        },
      ],
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
    },
  ],
}, {
  name: '3',
  color: colors.red,
  locked: true,
  levels: [
    {
      name: 'Concentric Box',
      targets: [
        {
          points: concentric({x: xcenter, y: ycenter, step: 20, max: 200}),
          velocity: 1,
        }
      ],
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
    }
  ],
}]

const levels = [].concat.apply([], worlds.map((w) => {
  return w.levels
}))

module.exports.worlds = worlds;

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

// http://gamedev.stackexchange.com/questions/9607/moving-an-object-in-a-circular-path
function circle(x, y, radius) {
  let points = []
  for( var deg = 0; deg < 360; deg += 10 ) {
    // http://www.rapidtables.com/convert/number/degrees-to-radians.htm
    const radians = deg * Math.PI / 180;
    points.push({x: x + Math.cos(radians) * radius, y: y + Math.sin(radians) * radius})
  }
  return points;
}

function backtrack(points) {
  const stepsBack = points.slice(1).reverse();
  stepsBack.shift()
  return points.concat(stepsBack)
}
