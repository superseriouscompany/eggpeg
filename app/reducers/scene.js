export default function(state = 'Start', action) {
  switch(action.type) {
    case 'scene:change':
      return action.scene
    default:
      return state
  }
}
