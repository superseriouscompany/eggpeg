import {concentric, backtrack, circle} from './patterns'

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
      name: 'Circle',
      max: 5,
      targets: [
        {
          points: circle(xcenter, ycenter, 80),
        },
      ],
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
      name: 'Concentric Box',
      max: 5,
      targets: [
        {
          points: concentric({x: xcenter, y: ycenter, step: 20, max: 200}),
          velocity: 1,
        }
      ],
    },
  ]
}
