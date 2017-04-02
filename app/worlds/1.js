import {steps} from './patterns'

module.exports = function(xcenter, ycenter, width, height) {
  const levels = [
    {
      name: 'vibrator',
      max: 5,
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
      max: 10,
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
      max: 5,
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
      max: 5,
      targets: [
        {
          points: steps({x: xcenter - 100, y: ycenter - 100, distance: 20, steps: 10}),
          velocity: .5,
        }
      ],
    },
    {
      name: 'Slow Meeting',
      max: 20,
      targets: [
        {
          points: [
            { x: xcenter - 100, y: ycenter - 50 },
            { x: xcenter - 4,   y: ycenter - 50 },
            { x: xcenter - 4,   y: ycenter + 50, velocity: 0.3 },
            { x: xcenter - 100, y: ycenter + 50 },
          ],
          velocity: 1,
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter - 50 },
            { x: xcenter + 4,   y: ycenter - 50 },
            { x: xcenter + 4,   y: ycenter + 50, velocity: 0.3 },
            { x: xcenter + 100, y: ycenter + 50 },
          ],
          velocity: 1,
        },
      ],
    },
    {
      name: 'three headed vibrator',
      max: 15,
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
  ]
  return __DEV__ ? levels.slice(0,1) : levels
}
