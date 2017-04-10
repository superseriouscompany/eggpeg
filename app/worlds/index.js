import config from '../config'
const {colors}   = require('../styles/base')

import { Dimensions } from 'react-native'
const {width, height} = Dimensions.get('window')
const xcenter    = width / 2;
const ycenter    = height / 2;

const worlds = [{
  name:        'Demo',
  color:       colors.green,
  targetColor: colors.red,
  deadColor:   colors.darkgreen,
  lightColor:  colors.lightgreen,
  background:  'GreenBackground.png',
  levels:      require('./Demo')(xcenter, ycenter, width, height, config.sizes.target)
}, {
  name:        '1',
  color:       colors.green,
  targetColor: colors.orange,
  deadColor:   colors.darkgreen,
  lightColor:  colors.lightgreen,
  levels:      require('./1')(xcenter, ycenter, width, height, config.sizes.target),
  background:  'GreenBackground.png',
  velocity:    .5,
},
{
  name:        '2',
  color:       colors.yellow,
  targetColor: colors.purple,
  deadColor:   colors.darkyellow,
  lightColor:  colors.lightyellow,
  yolkColor:   'orange',
  locked:      false,
  background:  'YellowBackground.png',
  levels:      require('./2')(xcenter, ycenter, width, height, config.sizes.target),
  velocity:    .5,
}, {
  name:        '3',
  color:       colors.orange,
  targetColor: colors.blue,
  deadColor:   colors.darkorange,
  lightColor:  colors.lightorange,
  locked:      false,
  background:  'OrangeBackground.png',
  levels:      require('./3')(xcenter, ycenter, width, height, config.sizes.target),
  velocity:    1,
}, {
  name:        '4',
  color:       colors.red,
  targetColor: colors.yellow,
  deadColor:   colors.darkred,
  lightColor:  colors.lightred,
  locked:      false,
  background:  'RedBackground.png',
  levels:      require('./4')(xcenter, ycenter, width, height, config.sizes.target),
  velocity:    1,
}, {
  name:        '5',
  color:       colors.purple,
  targetColor: colors.red,
  deadColor:   colors.darkpurple,
  lightColor:  colors.lightpurple,
  locked:      false,
  background:  'PurpleBackground.png',
  levels:      require('./5')(xcenter, ycenter, width, height, config.sizes.target),
  velocity:    2,
}, {
  name:        '6',
  color:       colors.blue,
  targetColor: colors.green,
  deadColor:   colors.darkblue,
  lightColor:  colors.lightblue,
  locked:      false,
  background:  'BlueBackground.png',
  levels:      require('./6')(xcenter, ycenter, width, height, config.sizes.target),
  velocity:    1,
}]


export default worlds.map((w) => {
  w.maxScore = 0;

  w.levels = w.levels.map((l, li) => {
    if( !l.max && w.name !== 'Demo' ) { console.warn('No max score defined for', l.name)}
    w.maxScore += l.max || 0

    if( !l.max && w.name !== 'Demo' ) { console.warn('no max score set for', l.name)}

    const targets = [].concat.apply([], l.targets)

    return {
      ...l,
      index: li,
      color:       w.color,
      targetColor: w.targetColor,
      yolkColor:   w.yolkColor,
      deadColor:   w.deadColor,
      targets: targets.map((t) => {
        if( !t.velocity && !l.velocity && !w.velocity && w.name !== 'Demo' ) { console.warn('no velocity set for a target', l.name)}
        t.velocity = t.velocity || l.velocity || w.velocity

        const radius = (t.width || config.sizes.target)/2
        // flatten points array
        const points = [].concat.apply([], t.points);

        t.points = points.map((p) => {
          p.x = Math.max(radius, p.x);
          p.x = Math.min(width - radius, p.x);
          p.y = Math.max(50 + radius, p.y);
          p.y = Math.min(height - radius - 50, p.y)
          return p
        })
        return t
      })
    }
  })

  return w
})
