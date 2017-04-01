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
          velocity: 1,
        }
      ],
    },
    {
      name: 'hyperactive brother',
      max: 20,
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
      max: 20,
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
            { x: 30, y: ycenter },
            { x: width, y:ycenter },
            { x: 0, y: ycenter },
          ],
          velocity: 1,
        },
      ],
    },
    {
      name: 'Circle',
      max: 5,
      targets: [
        {
          points: circle(xcenter, ycenter, 80),
          velocity: 1,
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
          velocity: 1,
        },
        {
          points: [
            { x: xcenter, y: ycenter - (width - targetWidth) / 2},
            { x: xcenter, y: ycenter + (width - targetWidth) / 2},
          ],
          velocity: 1,
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
          velocity: 1,
        },
      ],
    },
  ]
}
