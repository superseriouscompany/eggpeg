import worlds from '../worlds'
import {colors} from '../styles/base'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  all: worlds,
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
        all: score(state, action.score, true),
      }
    case 'worlds:score':
      return {
        ...state,
        all: score(state, action.score),
      }
    case 'level:load':
      return {
        ...state,
        all: reachLevel(state, action.level.index),
      }
    case 'worlds:pause':
      return {
        ...state,
        current: {
          ...state.current,
          paused: true,
        }
      }
    case 'worlds:resume':
      return {
        ...state,
        current: {
          ...state.current,
          paused: false,
        }
      }
    case 'worlds:select':
      return {
        ...state,
        current: state.all.find((w) => {return w.name == action.name}),
      }
    case 'worlds:clear':
      return {
        ...state,
        current: null,
      }
    case REHYDRATE:
      const incoming = action.payload.worlds
      if( !incoming ) { return state }
      return {
        current: state.current,
        all:     mergeScores(state.all, incoming.all),
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

function score(state, score, beaten) {
  return state.all.map((w) => {
    if( w.name == state.current.name && w.name !== 'Demo') {
      w.beaten = beaten
      if( beaten ) { w.percentage = 1; }
      if( isNaN(score) ) {
        console.error(`${score} is not a number`)
      }
      w.score = Math.max(score, w.score || 0)
    }
    return w
  })
}

function reachLevel(state, index) {
  return state.all.map((w) => {
    if( w.name == state.current.name ) {
      const percentage = index / w.levels.length
      w.percentage = Math.max(w.percentage || 0, percentage)
    }
    return w
  })
}

function mergeScores(initial, loaded) {
  return initial.map((w) => {
    const match = (loaded || []).find((lw) => { return lw.name === w.name })
    if( match ) {
      return {
        ...match,
        ...w,
        locked: match.locked && w.locked,
      }
    }
    return w
  })
}
