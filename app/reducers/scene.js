import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  current: 'Start',
  previous: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'scene:change':
      return {
        current: action.scene,
        previous: state.current
      }
    case 'scene:pop':
      return {
        current: state.previous || 'Start',
        previous: null,
      }
    case REHYDRATE:
      console.warn('rehydrating')
      const incoming = action.payload.scene;
      if( !incoming ) { return {...initialState} }
      const {level}  = action.payload;
      if( incoming.current == 'Game' && level.done && !level.win ) {
        return {...initialState}
      }
      return {...initialState, ...incoming}
    default:
      return state
  }
}
