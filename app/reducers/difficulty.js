const initialState = { unlocked: false, mode: 'easy'}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'difficulty:unlock':
      return {
        ...state,
        unlocked: true,
      }
    case 'difficulty:set':
      return {
        ...state,
        mode: action.mode
      }
    default:
      return state
  }
}
