import config from '../config'

export default function head(state = config.head, action) {
  switch(action.type) {
    case 'head:move':
      return {
        ...state,
        x:        state.x + action.velocity,
        velocity: action.velocity,
      }
    case 'head:setY':
      return {
        ...state,
        y: action.y,
      }
    case 'head:hit':
      return {
        ...state,
        hit: true,
      }
    default:
      return state;
  }
}
