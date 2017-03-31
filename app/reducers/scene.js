import config from '../config'

const initialState = {
  current: {
    name: config.startingScene
  },
  previous: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'scene:change':
      return {
        current: {
          name:      action.scene,
          animation: action.animation,
          props:     action.props,
        },
        previous: state.current,
      }
    case 'scene:pop':
      // TODO: reverse animation on pop
      return {
        current: {
          ...(state.previous || initialState.current),
          animation: action.animation,
        },
        previous: null,
      }
    default:
      return state
  }
}
