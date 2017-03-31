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
    case 'score:newRecord':
      return {
        ...state,
        newRecord: true,
      }
    case 'score:clear':
      return {
        ...state,
        newRecord: false,
      }
    case 'score:setHighScores':
      return {
        ...state,
        highScores: action.scores,
        isHigh:     action.isHigh,
      }
    case 'worlds:select':
    case 'score:reset':
    case 'game:reset':
      return {
        ...initialState,
        highScores: state.highScores,
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
