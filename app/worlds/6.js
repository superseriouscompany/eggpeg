import {circle, concentric, backtrack} from './patterns'

module.exports = function(xcenter, ycenter, width, height, targetWidth) {
  return [
    {
      name: 'wave',
      max: 5,
      targets: [
        {
          points: [
            { x: xcenter - 150, y: ycenter },
            { x: xcenter - 150, y: ycenter - 120 },
            { x: xcenter - 150, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 150, y: ycenter },
            { x: xcenter - 150, y: ycenter + 120 },
            { x: xcenter - 150, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter + 20 },
            { x: xcenter - 100, y: ycenter - 120 },
            { x: xcenter - 100, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 100, y: ycenter - 20 },
            { x: xcenter - 100, y: ycenter + 120 },
            { x: xcenter - 100, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 50, y: ycenter + 40 },
            { x: xcenter - 50, y: ycenter - 120 },
            { x: xcenter - 50, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter - 50, y: ycenter - 40 },
            { x: xcenter - 50, y: ycenter + 120 },
            { x: xcenter - 50, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter, y: ycenter + 60 },
            { x: xcenter, y: ycenter - 120 },
            { x: xcenter, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter, y: ycenter - 60 },
            { x: xcenter, y: ycenter + 120 },
            { x: xcenter, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 50, y: ycenter + 80 },
            { x: xcenter + 50, y: ycenter - 120 },
            { x: xcenter + 50, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 50, y: ycenter - 80 },
            { x: xcenter + 50, y: ycenter + 120 },
            { x: xcenter + 50, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter + 100 },
            { x: xcenter + 100, y: ycenter - 120 },
            { x: xcenter + 100, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 100, y: ycenter - 100 },
            { x: xcenter + 100, y: ycenter + 120 },
            { x: xcenter + 100, y: ycenter - 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 150, y: ycenter - 120 },
            { x: xcenter + 150, y: ycenter + 120 },
          ],
        },
        {
          points: [
            { x: xcenter + 150, y: ycenter + 120 },
            { x: xcenter + 150, y: ycenter - 120 },
          ],
        },
      ],
      velocity: 2,
    },
    {
      name: 'traffic jam',
      max: 100,
      targets: jam(10, 50),
      velocity: 1,
    },
    {
      name: 'circle jam',
      max: 50,
      targets: circleJam(10),
      velocity: 1,
    },
    {
      name: 'pyramid',
      max: 40,
      targets: pyramid(8, 20, 60),
      velocity: 1,
    },
    {
      name: 'guitar',
      max: 70,
      targets: [
        guitarStrings(60),
        guitarFrets(60),
      ],
      velocity: 1,
    },
    {
      name: 'triple double',
      max: 90,
      targets: [
        triple(ycenter - 150),
        triple(ycenter + 150),
      ]
    },
    {
      name: 'The Santi Special',
      max: 45,
      targets: [
        {
          points: [
            { x: xcenter - 50, y: ycenter },
            { x: xcenter - 50, y: ycenter - 50 },
            { x: xcenter, y: ycenter - 50 },
            { x: xcenter, y: ycenter }
          ],
          velocity: 1,
        },
        {
          points: [
            { x: xcenter - 50, y: ycenter },
            { x: xcenter - 50, y: ycenter + 50 },
            { x: xcenter, y: ycenter + 50 },
            { x: xcenter, y: ycenter }
          ],
          velocity: 1,
        },
        {
          points: [
            { x: xcenter, y: ycenter },
            { x: xcenter, y: ycenter - 25 },
            { x: xcenter + 125, y: ycenter - 25 },
            { x: xcenter + 125, y: ycenter + 25 },
            { x: xcenter, y: ycenter + 25 },
          ],
          velocity: 1,
        }
      ],
    },
    {
      name: 'black diamond',
      max: 80,
      targets: [
        diamonds(xcenter - 25, 100),
        diamonds(xcenter + 25, 100, true),
      ],
      velocity: 1,
    },
  ]

  function triple(y) {
    const targets = [
      {
        velocity: .5,
        points: [
          { x: 0, y: y, },
          { x: width, y: y, },
        ],
      },
      {
        velocity: 1,
        points: [
          { x: 0, y: y, },
          { x: width, y: y, },
        ],
      },
      {
        velocity: 2,
        points: [
          { x: 0, y: y, },
          { x: width, y: y, },
        ],
      },
    ]
    return targets
  }

  function guitarFrets(distance) {
    const targets = []
    for( var i = 0; i < 5; i++ ) {
      const x = xcenter - 120 + (i * 60)
      targets.push({
        points: [
          { x: x, y: ycenter - distance },
          { x: x, y: ycenter + distance }
        ]
      })
    }
    return targets
  }

  function guitarStrings(separation) {
    const targets = []
    for( var i = 0; i < 3; i++ ) {
      const y = ycenter - separation + (i * separation);
      targets.push({
        points: [
          { x: xcenter - 60 * 2, y: y, },
          { x: xcenter + 60 * 2, y: y},
        ]
      })
    }
    return targets
  }

  function diamonds(x, radius, clockwise) {
    const targets = []

    for( var i = 0; i < 4; i++ ) {
      const y = 70 + i * radius

      if( clockwise ) {
        targets.push({
          points: [
            { x: x, y: y },
            { x: x + radius/2, y: y + radius/2 },
            { x: x, y: y + radius },
            { x: x - radius/2, y: y + radius/2 },
          ]
        })
      } else {
        targets.push({
          points: [
            { x: x, y: y },
            { x: x - radius/2, y: y + radius/2 },
            { x: x, y: y + radius },
            { x: x + radius/2, y: y + radius/2 },
          ]
        })
      }
    }
    return targets
  }

  function pyramid(count, xspread, yspread) {
    const targets = [{
      points: [{x: xcenter, y: 0}],
      velocity: 0,
    }]
    for( var i = 0; i < count; i++ ) {
      const y = 70 + (i+1) * yspread;
      targets.push({
        points: [
          { x: xcenter, y: y },
          { x: xcenter + (i+1) * xspread, y: y },
          { x: xcenter - (i+1) * xspread, y: y },
        ]
      })
    }
    return targets
  }

  function circleJam(count) {
    const targets = []
    for( var i = 0; i < count; i++ ) {
      targets.push({
        points: circle(xcenter, ycenter, 150, i * (360/count))
      })
    }
    return targets
  }

  function jam(count, distance) {
    const targets = []
    for( var i = 0; i < count; i++ ) {
      targets.push({
        points: [
          { x: xcenter, y: 70 + (distance * i) },
          { x: xcenter, y: height },
          { x: xcenter, y: 0},
        ]
      })
    }

    return targets
  }
}
