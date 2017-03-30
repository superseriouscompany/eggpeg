export default function(state=[], action) {
  switch(action.type) {
    case 'retry:enqueue':
      return state.concat(action.request)
    case 'retry:process':
      return state.filter((request) => {
        return request.id !== action.requestId
      })
    default:
      return state;
  }
}
