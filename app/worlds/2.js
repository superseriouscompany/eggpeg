import {steps, circle} from './patterns'
import config from '../config'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  var levels = [
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
      name: 'Slow triangle',
      max: 5,
      targets: [
        {
          points: [
            { x: 0, y: 0 },
            { x: 20 + 50, y: 0 },
            { x: 0, y: 70 + 50 },
          ],
          velocity: .5,
        }
      ]
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
      name: 'slow circle',
      max: 5,
      targets: [
        {
          points: circle(xcenter, ycenter, 10),
          velocity: .5,
        },
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
    {
      name: 'slow t',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter, y: ycenter - 15 },
            { x: xcenter, y: ycenter },
            { x: xcenter + 15, y: ycenter },
            { x: xcenter - 15, y: ycenter },
            { x: xcenter, y: ycenter },
          ],
          velocity: .5,
        }
      ]
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
          velocity: .5,
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
  ]


  var step = (config.sizes.largestTarget - config.sizes.target) / levels.length;

  for (var i = 0; i < levels.length; i++) {
    for (var j = 0; j < levels[i].targets.length; j++ ) {
      levels[i].targets[j].width = config.sizes.largestTarget - (i * step)
    }
  }

  return levels
}
