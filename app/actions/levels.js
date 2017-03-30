import config from '../config'
import levels from '../levels'

export function loadFirstLevel() {
  let level = levelByName(config.startingLevel);
  return loadLevel(level)
}

export function loadLevel(level) {
  return function(dispatch) {
    dispatch({type: 'level:clear'})
    dispatch({type: 'level:load', level: level})
    level.targets.forEach((target) => {
      dispatch({
        type: 'targets:add',
        target,
      })
    })
  }
}

function levelByName(name) {
  let level;
  for( var i = 0; i < levels.length; i++ ) {
    if( levels[i].name.toLowerCase() !== name.toLowerCase() ) { continue; }
    return levels[i];
  }
  throw `Level not found: ${name}`
}
