import {circle, concentric, backtrack} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
    {
      name: 'Fast Guy',
      max: 5,
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
      max: 20,
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
      name: 'Superfast drop',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: 0 },
            { x: xcenter, y: height, velocity: 3 },
          ],
          velocity: .5,
        }
      ]
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
      name: 'contained triangle',
      max: 25,
      targets: [
        {
          points: [
            { x: xcenter - 100, y: ycenter - 100 },
            { x: xcenter + 100, y: ycenter - 100 },
          ],
          velocity: 2,
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter + 100 },
            { x: xcenter - 100, y: ycenter + 100 },
          ],
          velocity: 2,
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter + 58 * Math.sqrt(3)},
            { x: xcenter, y: ycenter - 58 * Math.sqrt(3) },
            { x: xcenter + 100, y: ycenter + 58 * Math.sqrt(3)},
          ],
          velocity: 1,
        },
      ]
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
      name: 'v-neck',
      max: 80,
      targets: [
        {
          points: [
            { x: 0, y: 0 },
            { x: xcenter, y: height },
          ]
        },
        {
          points: [
            { x: width, y: 0 },
            { x: xcenter, y: height },
          ]
        },
        {
          points: [
            { x: xcenter, y: height },
            { x: 0, y: 0 },
          ],
          velocity: 1,
        },
        {
          points: [
            { x: xcenter, y: height },
            { x: width, y: 0 },
          ],
          velocity: 1,
        }
      ],
      velocity: 2,
    },
    {
      name: 'hamsterdam',
      max: 50,
      targets: [
        {
          points: [
            { x: xcenter - 150, y: ycenter - 20 },
            { x: xcenter - 150, y: ycenter + 20 },
          ]
        },
        {
          points: [
            { x: xcenter + 150, y: ycenter - 20 },
            { x: xcenter + 150, y: ycenter + 20 },
          ]
        },
        {
          points: [
            { x: xcenter - 20, y: ycenter - 150 },
            { x: xcenter + 20, y: ycenter - 150 },
          ]
        },
        {
          points: [
            { x: xcenter - 20, y: ycenter + 150 },
            { x: xcenter + 20, y: ycenter + 150 },
          ]
        },
        {
          points: [
            { x: xcenter, y: ycenter },
            { x: xcenter, y: ycenter + 150 },
            { x: xcenter, y: ycenter - 150 },
          ],
          velocity: 1,
        },
        {
          points: [
            { x: xcenter, y: ycenter },
            { x: xcenter + 150, y: ycenter },
            { x: xcenter - 150, y: ycenter },
          ],
          velocity: 1,
        }
      ],
      velocity: 2,
    },
    {
      name: 'wave',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter - 150, y: ycenter },
            { x: xcenter - 150, y: ycenter - 120 },
            { x: xcenter - 150, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 150, y: ycenter },
            { x: xcenter - 150, y: ycenter + 120 },
            { x: xcenter - 150, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter + 20 },
            { x: xcenter - 100, y: ycenter - 120 },
            { x: xcenter - 100, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter - 20 },
            { x: xcenter - 100, y: ycenter + 120 },
            { x: xcenter - 100, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 50, y: ycenter + 40 },
            { x: xcenter - 50, y: ycenter - 120 },
            { x: xcenter - 50, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 50, y: ycenter - 40 },
            { x: xcenter - 50, y: ycenter + 120 },
            { x: xcenter - 50, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter, y: ycenter + 60 },
            { x: xcenter, y: ycenter - 120 },
            { x: xcenter, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter, y: ycenter - 60 },
            { x: xcenter, y: ycenter + 120 },
            { x: xcenter, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 50, y: ycenter + 80 },
            { x: xcenter + 50, y: ycenter - 120 },
            { x: xcenter + 50, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 50, y: ycenter - 80 },
            { x: xcenter + 50, y: ycenter + 120 },
            { x: xcenter + 50, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter + 100 },
            { x: xcenter + 100, y: ycenter - 120 },
            { x: xcenter + 100, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter - 100 },
            { x: xcenter + 100, y: ycenter + 120 },
            { x: xcenter + 100, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 150, y: ycenter - 120 },
            { x: xcenter + 150, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 150, y: ycenter + 120 },
            { x: xcenter + 150, y: ycenter - 120 },
          ],
        },
      ],
      velocity: 2,
    },
    {
      name: 'X Marks the Spot',
      max: 80,
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
    }
  ]
}
