export default function(state={}, action) {
  switch(action.type) {
    case 'bullets:hit':
      return {
        ...state,
        score: (state.score || 0) + action.score,
      }
    case 'result:win':
      return {
        ...state,
        win:     true,
        winTime: +new Date,
      }
    case 'result:finish':
      return {
        ...state,
        winTime: null,
        done: true,
      }
    case 'result:loss':
      return {
        ...state,
        win: false,
        done: true,
      }
    case 'result:retry':
      return {
        ...state,
        done: false,
        win:  null,
        score: 0,
      }
    default:
      return state
  }
}
