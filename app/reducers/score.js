const initialState = {total: 0, level: 0}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'bullets:hit':
      console.log('updating level score')
      return {
        ...state,
        level: state.level + action.score,
      }
    case 'level:clear':
      return {
        ...state,
        level: 0,
      }
    case 'level:loss':
    case 'level:win':
      return {
        ...state,
        total: state.total + state.level,
      }
    case 'score:reset':
      return initialState
    default:
      return state
  }
}
