import config from '../config'

export default function targets(state = [], action) {
  switch(action.type) {
    case 'targets:add':
      return state.concat({
        ...config.target,
        ...action.target,
        x: action.target.points[0].x,
        y: action.target.points[0].y,
        width: config.sizes.target,
      })
    case 'targets:hit':
      return state.map(hit(action.index))
    case 'level:clear':
      return []
    case 'tick':
      return state.map(tick)
    default:
      return state;
  }
}

function hit(index) {
  return function(target, i) {
    if( i != index ) { return target; }
    target.hit = true;
    return target;
  }
}

function reset(target) {
  delete target.hit
  target.x = target.originX
  target.y = target.originY
  return target
}

function tick(target) {
  if( target.hit ) { return target; }
  if( !target.points || !target.points.length || target.points.length == 1 ) { return target; }

  if( target.pointIndex === undefined ) { target.pointIndex = 1; }
  let point = target.points[target.pointIndex]
  if( target.x == point.x && target.y == point.y ) {
    target.pointIndex++
    if( target.pointIndex == target.points.length ) { target.pointIndex = 0 }
    point = target.points[target.pointIndex]
    console.log('reset point index to ', target.pointIndex)
  }

  const dirx = target.x > point.x ? -1 : 1
  const diry = target.y > point.y ? -1 : 1

  target.x += target.velocity * dirx
  target.y += target.velocity * diry

  return target;
}
