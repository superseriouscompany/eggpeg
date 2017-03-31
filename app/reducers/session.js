const initialState = {
  goal:  null,
  score: 0,
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'session:goal':
      return {
        ...state,
        goal: action.goal,
      }
    case 'bullets:hit':
      return {
        ...state,
        score: (state.score || 0) + action.score,
        encouragement: encouragement(action.score, action.count),
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

function encouragement(score, number) {
  switch(number) {
    case 2:
      return 'double!'
    case 3:
      return 'triple!'
    case 4:
      return 'quadruple!'
  }

  switch(score / config.scoreBonus) {
    case 1:
      return 'hit!'
    case 2:
      return 'nice hit!'
    case 5:
      return 'bullseye!'
    default:
      return 'wha happen?'
  }
}
