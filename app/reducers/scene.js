export default function(state = {current: 'Start', previous: null}, action) {
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
    default:
      return state
  }
}
