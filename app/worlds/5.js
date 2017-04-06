import {circle, concentric, backtrack} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
    {
      name: 'Olympic Rings',
      max: 125,
      targets: [
        {
          points: circle(xcenter - 75, ycenter, 75, 0),
        },
        {
          points: circle(xcenter, ycenter - 75, 75, 90),
        },
        {
          points: circle(xcenter + 75, ycenter, 75, 180),
        },
        {
          points: circle(xcenter, ycenter + 75, 75, 270),
        },
      ]
    },
    {
      name: 'v-neck',
      max: 20,
      targets: [
        {
          points: [
            { x: 0, y: 0, velocity: 1  },
            { x: xcenter, y: height },
          ]
        },
        {
          points: [
            { x: width, y: 0, velocity: 1 },
            { x: xcenter, y: height },
          ]
        },
      ],
      velocity: 2,
    },
    {
      name: 'Superfast drop',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: 0 },
            { x: xcenter, y: height, velocity: 3 },
          ],
          velocity: 1,
        }
      ]
    },
    {
      name: 'Two Speed',
      max: 20,
      targets: [
        {
          points: [
            { x: 0, y:     ycenter },
            { x: width, y: ycenter}
          ],
          velocity: 1,
        },
        {
          points: [
            { x: width, y: ycenter },
            { x: 0, y:     ycenter },
          ],
          velocity: 2,
        }
      ],
    },
    {
      name: 'vesuvian man',
      max: 10,
      targets: [
        {
          points: circle(xcenter, ycenter, 100, 90),
        },
        {
          points: [
            { x: xcenter, y: ycenter - 100 },
            { x: xcenter - 100, y: ycenter - 100 },
            { x: xcenter - 100, y: ycenter + 100 },
            { x: xcenter + 100, y: ycenter + 100 },
            { x: xcenter + 100, y: ycenter - 100 },
          ],
        }
      ],
      velocity: 1,
    },
    {
      name: 'Superfast',
      max: 5,
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
      name: 'Fast asterisk',
      max: 5 * 3 * 3,
      targets: [
        {
          points: [
            { x: xcenter - 60, y: ycenter + 60 },
            { x: xcenter + 60, y: ycenter - 60 },
          ]
        },
        {
          points: [
            { x: xcenter + 60, y: ycenter + 60 },
            { x: xcenter - 60, y: ycenter - 60 },
          ]
        },
        {
          points: [
            { x: xcenter, y: ycenter - 60 },
            { x: xcenter, y: ycenter + 60 },
          ]
        },
      ],
      velocity: 2,
    },
    {
      name: 'The Santi Special',
      max: 45,
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
    },
    {
      name: 'Synchronized swimming',
      max: 25,
      targets: [
        {
          points: circle(xcenter, ycenter, 40, 270),
        },
        {
          points: circle(xcenter - 100, ycenter - 100, 40, 270),
        },
        {
          points: circle(xcenter + 100, ycenter - 100, 40, 270),
        },
        {
          points: circle(xcenter - 100, ycenter + 100, 40, 270),
        },
        {
          points: circle(xcenter + 100, ycenter + 100, 40, 270),
        },
      ],
      velocity: 2,
    },
    {
      name: 'traffic jam',
      max: 100,
      targets: jam(9, 50),
      velocity: 1,
    },
  ]

  function jam(count, distance) {
    const targets = []
    for( var i = 0; i < count; i++ ) {
      targets.push({
        points: [
          { x: xcenter, y: 70 + (distance * i) },
          { x: xcenter, y: height },
          { x: xcenter, y: 0},
        ]
      })
    }

    return targets
  }
}
