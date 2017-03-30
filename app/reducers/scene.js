import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  current: 'Worlds',
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
      // Reset to home screen if we were on game over
      const incoming = action.payload.scene;
      const {level}  = action.payload;
      if( !incoming ) { return {...initialState} }
      if( incoming.current == 'Game' && level.done && !level.win ) {
        return {...initialState}
      }
      return {...initialState, ...incoming}
    default:
      return state
  }
}
