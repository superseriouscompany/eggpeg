const initialState = 'easy'

export default function(state = initialState, action) {
  switch(action.type) {
    case 'difficulty:set':
      return action.mode
    default:
      return state
  }
}
