import {steps, circle} from './patterns'
import config from '../config'

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
        },
      ],
    },
    {
      name: 'slow circle',
      max: 5,
      targets: [
        {
          points: circle(xcenter, ycenter, 20),
          velocity: .5,
        },
      ]
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
          points: steps({x: xcenter + 100, y: ycenter + 100, distance: -20, steps: 10}),
          velocity: .5,
        }
      ],
    },
    {
      name: 'slow t',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: ycenter - 40 },
            { x: xcenter, y: ycenter },
            { x: xcenter + 40, y: ycenter },
            { x: xcenter - 40, y: ycenter },
            { x: xcenter, y: ycenter },
          ],
          velocity: .5,
        }
      ]
    },
    {
      name: 'slow line circle',
      max: 5,
      targets: [
        {
          points: [
            { x: width, y: ycenter },
            { x: xcenter + 100, y: ycenter },
            circle(xcenter + 50, ycenter, 50),
            { x: width, y: ycenter },
          ],
          velocity: .5,
        }
      ]
    },
    {
      name: 'Slow drop',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: 0 },
            { x: xcenter, y: ycenter, velocity: 1, },
          ],
          velocity: .5,
        }
      ]
    },
    {
      name: 'Slow diagonal',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter - 100, y: ycenter + 100 },
            { x: xcenter + 100, y: ycenter - 100 },
          ],
          velocity: .5,
        }
      ]
    },
  ]
  return config.shortWorld ? levels.slice(0,1) : levels
}
