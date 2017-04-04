import {concentric, backtrack, circle} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
    {
      name: 'Crossing',
      max: 20,
      targets: [
        {
          points: [
            { x: 0, y: ycenter },
            { x: width, y: ycenter },
          ],
        },
        {
          points: [
            { x: xcenter, y: ycenter - (width - targetWidth) / 2},
            { x: xcenter, y: ycenter + (width - targetWidth) / 2},
          ],
        }
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
      name: 'Star of David',
      max: 20,
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
      name: 'Argyle',
      max: 20,
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
      name: 'pigeons',
      max: 100,
      targets: [
        pigeon({x: xcenter, y: ycenter - 100}),
        pigeon({x: xcenter, y: ycenter }),
        pigeon({x: xcenter + 100, y: ycenter }),
        pigeon({x: xcenter - 100, y: ycenter }),
        pigeon({x: xcenter, y: ycenter + 100 }),
      ],
      velocity: 1,
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
  ]
}