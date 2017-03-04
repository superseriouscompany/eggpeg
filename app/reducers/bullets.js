import config from '../config'

export default function bullet(state = [], action) {
  switch(action.type) {
    case 'bullet:fire':
      return state.concat(
        {
          ...config.bullet,
          time: +new Date,
          x: action.x,
          y: action.y,
          shadow: 1,
        }
      )
    case 'result:retry':
      return []
    case 'tick':
      return state.map(tick)
    default:
      return state;
  }
}

function tick(bullet) {
  if( !bullet.time ) { return bullet; }
  const bulletFiredAgo = +new Date - bullet.time;
  const isExpired      = bulletFiredAgo >= bullet.delay + bullet.linger;
  const isActive       = bulletFiredAgo >= bullet.delay && !isExpired;

  if( !isExpired && !isActive ) {
    const shadow  = (bullet.delay - bulletFiredAgo) / bullet.delay;
    bullet.shadow = shadow;
  } else if( isExpired ) {
    bullet.spent   = true;
    bullet.visible = false;
  } else if( !bullet.visible && isActive ) {
    bullet.visible = true;
    bullet.shadow  = 0;
  }
  return bullet;
}
