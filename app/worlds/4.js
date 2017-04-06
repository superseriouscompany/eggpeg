import {concentric, backtrack, circle} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
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
      name: 'Jagged Edge',
      max: 5,
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
      name: 'stop to party',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: ycenter - 100 },
            { x: xcenter + 100, y: ycenter - 100 },
            circle(xcenter + 100, ycenter - 150, 50, 90, false),
            { x: xcenter + 100, y: ycenter + 100 },
            circle(xcenter + 100, ycenter + 150, 50, 270 ),
            { x: xcenter - 100, y: ycenter + 100 },
            circle(xcenter - 100, ycenter + 150, 50, 270, false),
            { x: xcenter - 100, y: ycenter - 100 },
            circle(xcenter - 100, ycenter - 150, 50, 90),
          ],
        }
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

  function pigeon(options) {
    const {x,y} = options
    const targets = [
      {
        points: [
          {x: x - 40, y: y },
          {x: x + 40, y: y}
        ],
      },
      {
        points: [
          {x: x, y: y - 40 },
          {x: x, y: y + 40 },
        ],
      },
    ]

    return targets
  }
}
