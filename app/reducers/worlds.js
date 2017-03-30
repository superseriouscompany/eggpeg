import base from '../styles/base'

const initialState = {
  all: [
    { name: 1, maxScore: 69, beaten: true, score: 50, color: base.colors.green },
    { name: 2, maxScore: 100, color: base.colors.yellow, score: 66, },
    { name: 3, maxScore: 420, locked: true, color: base.colors.orange },
    { name: 4, comingSoon: true, color: base.colors.red },
  ],
  current: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'worlds:unlock':
      return unlock(state, action.name)
    case 'worlds:beat':
      return beat(state, action.name, action.score)
    case 'worlds:select':
      return {
        ...state,
        current: state.all.find((w) => {return w.name == action.name})
      }
    default:
      return state
  }
}

function unlock(state, name) {
  return state.all.map((w) => {
    if( w.name == name ) {
      w.locked = false
    }
    return w
  })
}

function beat(state, name, score) {
  return state.all.map((w) => {
    if( w.name == name ) {
      w.beaten = true
      w.score = Math.max(score, w.score || 0)
    }
    return w
  })
}
