export default function(state = {}, action) {
  switch(action.type) {
    case 'continues:add':
      return {
        ...state,
        pack:  action.pack,
        count: (state.count || 0) + action.count,
      }
    case 'continues:use':
      if( !state.count || state.count < 1 ) {
        throw new Error('No continues available.')
      }
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}
