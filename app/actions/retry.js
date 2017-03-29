// request.path:    path
// request.body:    body (if applicable)
// request.signed:  is signed request
// request.options: fetch options
export function enqueueRetry(requestType) {
  return function(dispatch) {
    dispatch({type: 'retry:enqueue', request: {id: Math.random(), type: requestType}})
  }
}

export function clearRetry(requestId) {
  return function(dispatch) {
    dispatch({type: 'retry:process', requestId: requestId})
  }
}
