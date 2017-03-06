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
  target.x = target.points[0].x
  target.y = target.points[0].y
  target.pointIndex = 1
  return target
}

function tick(target) {
  // Guards
  if( target.hit ) { return target; }
  if( !target.points || !target.points.length || target.points.length == 1 ) { return target; }
  if( !target.velocity ) { return target; }

  // Figure out what point we should be headed to
  if( target.pointIndex === undefined ) { target.pointIndex = 1; }
  let point = target.points[target.pointIndex]
  if( target.x == point.x && target.y == point.y ) {
    nextPoint(target)
    point = target.points[target.pointIndex]
  }

  // Figure out what direction we should step in
  const dirx = target.x == point.x ? 0 : target.x > point.x  ? -1 : 1
  const diry = target.y == point.y ? 0 : target.y > point.y  ? -1 : 1

  // Figure out the ratio of steps
  const dx = Math.abs(point.x - target.x)
  const dy = Math.abs(point.y - target.y)

  // Move forward at velocity times ratio of slopes
  const velocity = point.velocity || target.velocity;
  target.x += velocity * dirx * Math.min(1, dx/dy)
  target.y += velocity * diry * Math.min(1, dy/dx)

  // Correct path if we have overshot the target
  if( Math.sqrt(Math.pow(target.x - point.x, 2) + Math.pow(target.y - point.y, 2)) <= velocity ) {
    target.x = point.x
    target.y = point.y
    nextPoint(target)
  }

  return target;
}

function nextPoint(target) {
  target.pointIndex++
  if( target.pointIndex == target.points.length ) { target.pointIndex = 0 }
}
