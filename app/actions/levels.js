import levels from '../levels'

export function loadLevel(index) {
  return function(dispatch) {
    dispatch({type: 'level:retry'})
    levels[index].targets.forEach((target) => {
      dispatch({
        ...target,
        type: 'targets:add',
      })
    })
  }
}
