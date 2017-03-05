import config from '../config'

export default function targets(state = [], action) {
  switch(action.type) {
    case 'targets:add':
      return state.concat({
        ...config.target,
        width:    config.sizes.target,
        originX:  action.x,
        originY:  action.y,
        x:        action.x,
        y:        action.y,
        xMax:     action.xMax,
        velocity: action.velocity,
      })
    case 'targets:hit':
      return state.map(hit(action.index))
    case 'result:retry':
      return state.map(reset)
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
  const {width, x, xMax} = target
  let   {velocity}       = target

  if( velocity > 0 && (x + width) >= xMax ) { velocity *= -1 }
  if( velocity < 0 && x <= 0 ) { velocity *= -1 }
  target.velocity = velocity;
  target.x = target.x + target.velocity;
  return target
}
