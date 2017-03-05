import config from '../config'

export default function(state={level: 0}, action) {
  switch(action.type) {
    case 'level:win':
      return {
        ...state,
        win:     true,
        winTime: +new Date + config.winDelay,
      }
    case 'level:finish':
      return {
        ...state,
        winTime: null,
        done: true,
      }
    case 'level:loss':
      return {
        ...state,
        win: false,
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
