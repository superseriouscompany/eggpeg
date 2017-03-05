import config from '../config'

export default function(state={level: 0}, action) {
  switch(action.type) {
    case 'level:win':
      return {
        ...state,
        win:     true,
        finishTime: +new Date + config.winDelay,
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
    case 'level:clear':
      return {
        level: 0,
      }
    default:
      return state
  }
}
