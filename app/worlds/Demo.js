module.exports = function(xcenter, ycenter, width, height) {
  return [
    {
      name: 'Stationary',
      targets: [
        {
          width: 200,
          points: [
            { x: xcenter, y: ycenter },
          ],
          velocity: 0,
        },
      ],
      hint: 'Tap the target to drop an egg on it.',
    },
    {
      name: 'Big line',
      targets: [
        {
          width: 200,
          points: [
            { x: xcenter, y: ycenter - 200 },
            { x: xcenter, y: ycenter + 200 },
          ],
          velocity: 1,
        }
      ],
      hint: 'Anticipate the movement.',
    },
    {
      name: 'Big line diagonal',
      targets: [
        {
          width: 200,
          points: [
            { x: 0, y: 0 },
            { x: width, y: height },
          ],
          velocity: 1,
        }
      ],
      hint: 'Targets move in many directions.',
    },
    {
      name: 'Big square',
      targets: [
        {
          width: 200,
          points: [
            { x: xcenter, y: 0 },
            { x: width, y: 0 },
            { x: width, y: height },
            { x: 0, y: height },
            { x: 0, y: 0 },
          ],
          velocity: 1,
        }
      ],
      hint: 'Watch for patterns.'
    },
    {
      name: 'Big double',
      targets: [
        {
          width: 200,
          points: [
            { x: 0, y: ycenter },
            { x: width, y: ycenter },
          ],
          velocity: 1,
        },
        {
          width: 200,
          points: [
            { x: width, y: ycenter },
            { x: 0, y: ycenter },
          ],
          velocity: 1,
        },
      ],
      hint: 'Hitting two targets doubles the score',
    },
  ]
}
