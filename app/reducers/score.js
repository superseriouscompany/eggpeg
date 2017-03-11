const initialState = {total: 0, level: 0, highScores: []}
import config from '../config'

export default function(state = initialState, action) {
  switch(action.type) {
    case 'bullets:hit':
      return {
        ...state,
        level:         state.level + action.score,
        total:         state.total + action.score,
        encouragement: encouragement(action.score, action.count),
      }
    case 'level:clear':
      return {
        ...state,
        level: 0,
        encouragement: null,
      }
    case 'score:setHighScores':
      return {
        ...state,
        highScores: action.scores,
        isHigh:     action.isHigh,
      }
    case 'score:reset':
      return initialState
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

  switch(score) {
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
