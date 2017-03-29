export function enqueueRetry(request) {
  return function(dispatch) {
    dispatch({type: 'retry:enqueue', request: Object.assign({
      id:   Math.random(),
      time: +new Date,
    }, request)})
  }
}

export function clearRetry(requestId) {
  return function(dispatch) {
    dispatch({type: 'retry:process', requestId: requestId})
  }
}
