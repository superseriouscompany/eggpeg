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
    level: 'Stationary',
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
    level: 'Slow line',
    targets: [
      {
        points: [
          { x: xcenter, y: ycenter - 50 },
          { x: xcenter, y: ycenter + 50 },
        ],
        velocity: .1,
      }
    ]
  },
  {
    level: 'Small loop',
    targets: [
      {
        points: [
          { x: xcenter - 5, y: ycenter - 5 },
          { x: xcenter + 5, y: ycenter - 5 },
          { x: xcenter + 5, y: ycenter + 5 },
          { x: xcenter + -5, y: ycenter + 5 },
        ],
        velocity: .2,
      }
    ]
  },
  {
    level: 'Straight Line',
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
    level: 'Whole Phone',
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
    ]
  },
  {
    level: 'Slow Meeting',
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
    ]
  },
  // TODO: stops
  // TODO: fast mtg
  {
    level: 'Fast Meeting',
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
    ]
  },
  {
    level: 'Two Speed',
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
    level: 'Stairs',
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
    ]
  },
  {
    level: 'X Marks the Spot',
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
  {
    level: 'The Santi Special',
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
    ]
  }
]

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
