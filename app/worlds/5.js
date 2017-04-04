import {circle, concentric, backtrack} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
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
  ]
}
