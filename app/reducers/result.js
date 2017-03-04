export default function(state={}, action) {
  switch(action.type) {
    case 'result:win':
      return {
        ...state,
        win:  true,
        done: true,
      }
    case 'result:loss':
      return {
        ...state,
        win: false,
        done: true,
      }
    case 'result:retry':
      return {
        ...state,
        done: false,
        win:  null,
      }
    default:
      return state
  }
}
