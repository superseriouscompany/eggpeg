export default function(state = false, action) {
  switch(action.type) {
    case 'victory:yes':
      return true
    case 'victory:reset':
      return false
    default:
      return state
  }
}
