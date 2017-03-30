import worlds from '../worlds'
import {colors} from '../styles/base'

const teaser = {name: Number(worlds[worlds.length-1]), comingSoon: true, color: colors.red}

const initialState = {
  all: worlds.concat(teaser),
  current: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'worlds:unlock':
      return {
        ...state,
        all: unlock(state)
      }
    case 'worlds:beat':
      return {
        ...state,
        all: beat(state, action.score),
      }
    case 'worlds:select':
      return {
        ...state,
        current: state.all.find((w) => {return w.name == action.name})
      }
    default:
      return state
  }
}

function unlock(state) {
  let unlock;
  return state.all.map((w, i) => {
    if( w.name == state.current.name ) { unlock = true;}
    else if( unlock ) { w.locked = false; unlock = false; }
    return w
  })
}

function beat(state, score) {
  return state.all.map((w) => {
    if( w.name == state.current.name ) {
      w.beaten = true
      w.score = Math.max(score, w.score || 0)
    }
    return w
  })
}
