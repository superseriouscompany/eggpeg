import {steps, circle} from './patterns'
import config from '../config'

module.exports = function(xcenter, ycenter, width, height) {
  const levels = [
    {
      name: 'vibrator',
      max: 5,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 10, y: ycenter },
            { x: xcenter + 10, y: ycenter },
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'double up down vibrator',
      max: 10,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter/2, y: ycenter - 10 },
            { x: xcenter/2, y: ycenter + 10 },
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: 3 * xcenter/2, y: ycenter - 10 },
            { x: 3 * xcenter/2, y: ycenter + 10 },
          ],
          velocity: 0.5,
        },

      ],
    },
    {
      name: 'double vibrator',
      max: 10,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: (xcenter/2) - 10, y: ycenter/2 },
            { x: (xcenter/2) + 10, y: ycenter/2 },
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: (3 * xcenter/2) - 10, y: (3 * ycenter/2) },
            { x: (3 * xcenter/2) + 10, y: (3 * ycenter/2) },
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'triple triangle vibrator',
      max: 15,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 60 + 5.6, y: ycenter + 50 - 5.6},
            { x: xcenter - 60 - 5.6, y: ycenter + 50 + 5.6},
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter, y: ycenter - 50 - 10},
            { x: xcenter, y: ycenter - 50 + 10},
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter + 60 - 5.6, y: ycenter + 50 - 5.6},
            { x: xcenter + 60 + 5.6, y: ycenter + 50 + 5.6},
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'triple vibrator',
      max: 15,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 10, y: ycenter/2 },
            { x: xcenter + 10, y: ycenter/2 },
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 10, y: ycenter },
            { x: xcenter + 10, y: ycenter },
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 10, y: (3 * ycenter/2) },
            { x: xcenter + 10, y: (3 * ycenter/2) },
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'mini circle',
      max: 5,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: circle(xcenter, ycenter, 10),
          velocity: 0.5,
        },
      ]
    },
    {
      name: 'vibrator marks the spot',
      max: 20,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter, y: ycenter - 40},
            { x: xcenter, y: ycenter + 40},
          ],
          velocity: .5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter, y: ycenter },
          ],
        },
      ],
    },
    {
      name: 'the world juan special',
      max: 35,
      targets: [
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter - 10, y: 10 },
            { x: xcenter + 10, y: 10 },
          ],
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: circle(xcenter/2, (3 * ycenter/2), 10),
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: circle((3 * xcenter/2), (3 * ycenter/2), 10),
          velocity: 0.5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter, y: ycenter - 40},
            { x: xcenter, y: ycenter + 40},
          ],
          velocity: .5,
        },
        {
          width: config.sizes.largestTarget,
          points: [
            { x: xcenter, y: ycenter },
          ],
        },
      ],
    },
  ]
  return config.shortWorld ? levels.slice(0,1) : levels
}
