import {circle} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
    {
      name: 'Solo',
      max: 5,
      targets: [
        {
          points: [
            { x: 0, y: ycenter },
            { x: width, y: ycenter }
          ],
        }
      ],
    },
    {
      name: 'Whole Phone',
      max: 5,
      targets: [
        {
          points: [
            { x: 0, y: 0 },
            { x: width, y: 0 },
            { x: width, y: height },
            { x: 0, y: height },
          ],
        },
      ],
    },
    {
      name: 'diamond',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter - 100, y: ycenter },
            { x: xcenter, y: ycenter - 150 },
            { x: xcenter + 100, y: ycenter },
            { x: xcenter, y: ycenter + 150 },
          ],
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
      name: 'linked',
      max: 20,
      targets: [
        {
          points: [
            { x: 0, y: ycenter },
            { x: width, y:ycenter },
          ],
        },
        {
          points: [
            { x: 40, y: ycenter },
            { x: width, y:ycenter },
            { x: 0, y: ycenter },
          ],
        },
      ],
    },
    {
      name: 'Concentric Box',
      max: 5,
      targets: [
        {
          points: concentric({x: xcenter, y: ycenter, step: 20, max: 200}),
          velocity: 1,
        }
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
      name: 'Circle',
      max: 5,
      targets: [
        {
          points: circle(xcenter, ycenter, 80),
        },
      ],
    },
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
  ]
}
