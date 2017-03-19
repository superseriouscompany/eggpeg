export default function(state={}, action) {
  switch(action.type) {
    case 'tutorial:complete':
      return {
        complete: true,
      }
    default:
      return state;
  }
}
