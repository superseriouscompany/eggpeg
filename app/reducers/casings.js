export default function(state=[], action) {
  switch(action.type) {
    case 'casing:drop':
      return state.concat({
        x:     action.x,
        y:     action.y,
        width: action.width,
      })
    case 'result:retry':
      return []
    default:
      return state
  }
}
