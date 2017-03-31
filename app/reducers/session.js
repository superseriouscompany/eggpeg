const initialState = {
  goal:  null,
  score: null,
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'session:goal':
      return {
        ...state,
        goal: action.goal,
      }
    case 'worlds:score':
      return {
        ...state,
        score: (state.score || 0) + action.score,
      }
    case 'game:reset':
      return {
        ...state,
        score: 0,
      }
    default:
      return state
  }
}
