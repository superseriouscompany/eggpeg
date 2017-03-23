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
      return state.map(hit(action.index, action.score, action.count))
    case 'bullets:miss':
      return state.map(miss(action.index))
    case 'tick':
      return state.map(tick)
    default:
      return state;
  }
}

function miss(index) {
  return function(bullet, i) {
    if( i != index ) { return bullet; }
    bullet.missed = true;
    return bullet;
  }
}

function hit(index, score, count) {
  return function(bullet, i) {
    if( i != index ) { return bullet; }
    bullet.hit = true;
    bullet.score = score;
    bullet.count = count;
    return bullet;
  }
}

const g = .5 * config.gravity;

function tick(bullet) {
  if( !bullet.time ) { return bullet; }
  const bulletFiredAgo = +new Date - bullet.time;
  const isExpired      = bulletFiredAgo >= bullet.delay + bullet.linger;
  const isActive       = bulletFiredAgo >= bullet.delay && !isExpired;

  if( !isExpired && !isActive ) {
    // http://keisan.casio.com/exec/system/1224835316
    const distance = (g * Math.pow(bulletFiredAgo / 1000, 2)) + 1;
    // http://math.stackexchange.com/questions/859760/calculating-size-of-an-object-based-on-distance
    if( config.gravity ) {
      bullet.shadow = 1 / parseFloat(distance.toFixed(2));
    } else {
      bullet.shadow  = (bullet.delay - bulletFiredAgo) / bullet.delay;
    }
  } else if( isExpired ) {
    bullet.spent   = true;
    bullet.visible = false;
  } else if( !bullet.visible && isActive ) {
    bullet.visible = true;
    bullet.shadow  = 0;
  }
  return bullet;
}
