import config from '../config'
const {colors}   = require('../styles/base')

import { Dimensions } from 'react-native'
const {width, height} = Dimensions.get('window')
const xcenter    = width / 2;
const ycenter    = height / 2;

const worlds = [{
  name:        'Demo',
  color:       colors.green,
  targetColor: colors.orange,
  deadColor:   colors.darkgreen,
  lightColor:  colors.lightgreen,
  levels: require('./Demo')(xcenter, ycenter, width, height, config.sizes.target)
}, {
  name:        '1',
  color:       colors.green,
  targetColor: colors.orange,
  deadColor:   colors.darkgreen,
  lightColor:  colors.green,
  levels: require('./1')(xcenter, ycenter, width, height, config.sizes.target)
},
{
  name: '2',
  color:       colors.yellow,
  targetColor: colors.purple,
  deadColor:   colors.darkyellow,
  lightColor:  colors.lightyellow,
  yolkColor:   'orange',
  locked: true,
  levels: require('./2')(xcenter, ycenter, width, height, config.sizes.target)
}, {
  name:        '3',
  color:       colors.orange,
  targetColor: colors.blue,
  deadColor:   colors.darkorange,
  lightColor:  colors.lightorange,
  locked: true,
  levels: require('./3')(xcenter, ycenter, width, height, config.sizes.target)
}]


export default worlds.map((w) => {
  w.maxScore = 0;

  w.levels = w.levels.map((l, li) => {
    if( !l.max && w.name !== 'Demo' ) { console.warn('No max score defined for', l.name)}
    w.maxScore += l.max || 0
    return {
      ...l,
      index: li,
      color:       w.color,
      targetColor: w.targetColor,
      yolkColor:   w.yolkColor,
      deadColor:   w.deadColor,
      targets: l.targets.map((t) => {
        const radius = (t.width || config.sizes.target)/2
        t.points = t.points.map((p) => {
          p.x = Math.max(radius, p.x);
          p.x = Math.min(width - radius, p.x);
          p.y = Math.max(50 + radius, p.y);
          p.y = Math.min(height - radius, p.y)
          return p
        })
        return t
      })
    }
  })

  return w
})
