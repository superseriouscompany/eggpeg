export default function(state = false, action) {
  switch(action.type) {
    case 'victory:yes':
      return true
    case 'victory:reset':
    case 'game:reset':
      return false
    default:
      return state
  }
}
