import {concentric, backtrack} from './patterns'

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
