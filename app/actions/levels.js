import config from '../config'
import levels from '../levels'

export function loadFirstLevel(showTutorial) {
  let level = levelByName(config.startingLevel);
  if( level < 5 && !showTutorial ) {
    level = 5;
  }
  return loadLevel(level)
}

export function loadLevel(index) {
  return function(dispatch) {
    dispatch({type: 'level:clear'})
    dispatch({type: 'level:load', index: index})
    levels[index].targets.forEach((target) => {
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
    return i;
  }
  throw `Level not found: ${name}`
}
