const initialState = {
  top:      null,
  recorded: null,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'score:record':
      return {
        ...state,
        top:      action.top,
        name:     action.name,
        recorded: +new Date,
      }
    default:
      return state
  }
}
