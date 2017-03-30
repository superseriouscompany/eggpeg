import {worlds} from '../levels'
import {colors} from '../styles/base'

const teaser = {name: Number(worlds[worlds.length-1]), comingSoon: true, color: colors.purple}

const initialState = {
  all: worlds.concat(teaser),
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
