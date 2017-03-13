import config from '../config'

export default function bullet(state = [], action) {
  switch(action.type) {
    case 'bullets:fire':
      return state.concat(
        {
          ...config.bullet,
          time: +new Date,
          x: action.x,
          y: action.y,
          shadow: 1,
          width: config.sizes.bullet,
        }
      )
    case 'level:clear':
      return []
    case 'bullets:hit':
      return state.map(hit(action.index, action.score))
    case 'tick':
      return state.map(tick)
    default:
      return state;
  }
}

function hit(index, score) {
  return function(bullet, i) {
    if( i != index ) { return bullet; }
    bullet.hit = true;
    bullet.score = score;
    return bullet;
  }
}

const g = .5 * 9.80665;

function tick(bullet) {
  if( !bullet.time ) { return bullet; }
  const bulletFiredAgo = +new Date - bullet.time;
  const isExpired      = bulletFiredAgo >= bullet.delay + bullet.linger;
  const isActive       = bulletFiredAgo >= bullet.delay && !isExpired;

  if( !isExpired && !isActive ) {
    const distance = g * Math.pow(bulletFiredAgo / 1000, 2);
    const shadow  = (bullet.delay - bulletFiredAgo) / bullet.delay;
    bullet.shadow = shadow;
    bullet.distanceMultiplier = Math.min(1, 1 / distance);
    console.warn('ms', bulletFiredAgo, 'distance', distance, 'multiplier', bullet.distanceMultiplier);
    // console.warn(1/)
  } else if( isExpired ) {
    bullet.spent   = true;
    bullet.visible = false;
  } else if( !bullet.visible && isActive ) {
    bullet.visible = true;
    bullet.shadow  = 0;
  }
  return bullet;
}
