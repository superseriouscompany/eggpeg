import config from '../config'

export default function(state={level: 1}, action) {
  switch(action.type) {
    case 'bullets:hit':
      return {
        ...state,
        score: (state.score || 0) + action.score,
      }
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
    case 'level:retry':
      return {
        ...state,
        done: false,
        win:  null,
        winTime: null,
        score: 0,
      }
    default:
      return state
  }
}
