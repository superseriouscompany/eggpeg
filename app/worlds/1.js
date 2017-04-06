import {steps, circle} from './patterns'
import config from '../config'

const worldOneTargetWidth = 100;

module.exports = function(xcenter, ycenter, width, height) {
  const levels = [
    {
      name: 'vibrator',
      max: 5,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter - 10, y: ycenter },
            { x: xcenter + 10, y: ycenter },
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'double static',
      max: 10,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter/2, y: ycenter },
          ],
          velocity: 0,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: 3 * xcenter/2, y: ycenter },
          ],
          velocity: 0,
        },

      ],
    },
    {
      name: 'double vibrator',
      max: 10,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: (xcenter/2) - 10, y: ycenter/2 },
            { x: (xcenter/2) + 10, y: ycenter/2 },
          ],
          velocity: 0.5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: (3 * xcenter/2) - 10, y: (3 * ycenter/2) },
            { x: (3 * xcenter/2) + 10, y: (3 * ycenter/2) },
          ],
          velocity: 0.5,
        },
      ],
    },
    {
      name: 'triple static',
      max: 15,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter - 60, y: ycenter + 50 },
          ],
          velocity: 0,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter, y: ycenter - 50 },
          ],
          velocity: 0,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter + 60, y: ycenter + 50 },
          ],
          velocity: 0,
        },
      ],
    },
    {
      name: 'triple vibrator',
      max: 15,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: (xcenter/2) - 10, y: ycenter },
            { x: (xcenter/2) + 10, y: ycenter },
          ],
          velocity: 0.5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter + 10, y: ycenter },
            { x: xcenter - 10, y: ycenter },
          ],
          velocity: 0.5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: (3 * xcenter/2) - 10, y: ycenter },
            { x: (3 * xcenter/2) + 10, y: ycenter },
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
          width: worldOneTargetWidth,
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
          width: worldOneTargetWidth,
          points: [
            { x: xcenter, y: ycenter - 40},
            { x: xcenter, y: ycenter + 40},
          ],
          velocity: .5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter, y: ycenter },
          ],
        },
      ],
    },
    {
      name: 'the world one special',
      max: 35,
      targets: [
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter - 10, y: ycenter/2 },
            { x: xcenter + 10, y: ycenter/2 },
          ],
          velocity: 0.5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: width, y: height },
          ],
          velocity: 0,
        },
        {
          width: worldOneTargetWidth,
          points: circle(xcenter/2, (3 * ycenter/2), 10),
          velocity: 0.5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter, y: ycenter - 40},
            { x: xcenter, y: ycenter + 40},
          ],
          velocity: .5,
        },
        {
          width: worldOneTargetWidth,
          points: [
            { x: xcenter, y: ycenter },
          ],
        },
      ],
    },
  ]
  return config.shortWorld ? levels.slice(0,1) : levels
}
