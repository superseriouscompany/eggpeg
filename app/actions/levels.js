import config from '../config'

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
