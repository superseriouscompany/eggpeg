import config from '../config'

const initialState = {
  current:  config.startingScene,
  previous: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'scene:change':
      return {
        current:  action.scene,
        previous: state.current,
        props:    action.props,
        animation: action.animation,
      }
    case 'scene:pop':
      // TODO: reverse animation on pop
      return {
        current: state.previous || 'Start',
        previous: null,
      }
    default:
      return state
  }
}
