import config from '../config'
import levels from '../levels'

export default function(state={level: 0}, action) {
  switch(action.type) {
    case 'level:win':
      return {
        ...state,
        win:     true,
        finishTime: +new Date + config.winDelay + action.delay,
      }
    case 'level:loss':
      return {
        ...state,
        finishTime: +new Date + config.lossDelay,
        win: false,
      }
    case 'level:finish':
      return {
        ...state,
        finishTime: null,
        done: true,
      }
    case 'level:load':
      if( !levels[action.index]) {
        throw `No level found at index ${action.index}`
      }
      return levels[action.index]
    default:
      return state
  }
}
