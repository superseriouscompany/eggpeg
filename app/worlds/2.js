import {steps, circle} from './patterns'
import config from '../config'

module.exports = function(xcenter, ycenter, width, height) {
  const levels = [
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
      name: 'vibrator marks the spot',
      max: 20,
      targets: [
        {
          points: [
            { x: xcenter, y: ycenter - 20},
            { x: xcenter, y: ycenter + 20},
          ],
          velocity: .5,
        },
        {
          points: [
            { x: xcenter, y: ycenter },
          ],
        },
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
      name: 'corner handoff',
      max: 20,
      targets: [
        {
          points: [
            { x: xcenter + 100, y: ycenter - 100 },
            { x: xcenter, y: ycenter },
          ],
          velocity: .5,
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter + 100 },
            { x: xcenter, y: ycenter },
          ],
          velocity: .5,
        }
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
      velocity: .5,
    },
    {
      name: 'venn diagram',
      max: 20,
      targets: [
        {
          points: circle(xcenter + 50, ycenter, 50),
          velocity: .5,
        },
        {
          points: circle(xcenter - 50, ycenter, 50, 180),
          velocity: .5,
        }
      ]
    },
    {
      name: 'Slow line and circle',
      max: 20,
      targets: [
        {
          points: [
            { x: 0, y: ycenter, },
            { x: width, y: ycenter, },
          ],
          velocity: .5,
        },
        {
          points: circle(xcenter, ycenter, 20),
          velocity: .5,
        }
      ]
    },
    {
      name: 'target ad',
      max: 15,
      targets: [
        {
          points: [
            { x: xcenter, y: ycenter },
          ],
          velocity: .5,
        },
        {
          points: circle(xcenter, ycenter, 60, 90),
          velocity: .5,
        },
        {
          points: circle(xcenter, ycenter, 120, 270),
          velocity: .5,
        }
      ]
    },
  ]
  return levels
}
