import config from '../config'

export default function(state={}, action) {
  switch(action.type) {
    case 'level:win':
      return {
        ...state,
        win:     true,
        finishTime: +new Date + config.timings.winDelay + action.delay,
      }
    case 'level:loss':
      return {
        ...state,
        finishTime: +new Date + config.timings.lossDelay,
        win: false,
      }
    case 'level:finish':
      return {
        ...state,
        finishTime: null,
        done: true,
      }
    case 'level:continue':
      return {
        ...state,
        finishTime: null,
        done: false,
      }
    case 'level:load':
      return action.level
    case 'level:loading':
      return {
        ...state,
        loading: true,
      }
    case 'level:loading:finished':
      return {
        ...state,
        loading: false,
      }
    case 'worlds:select':
      return {}
    default:
      return state
  }
}
