'use strict';

import api from './api'

export function loadScores() {
  return function(dispatch) {
    dispatch({type: 'leaderboard:loading'})
    return api.get('/leaderboard').then((json) => {
      dispatch({type: 'leaderboard:load', scores: json.scores })
    }).catch((err) => {
      dispatch({type: 'leaderboard:load:failed', err: err})
      throw err;
    })
  }
}

export function postScore(score, name) {
  return function(dispatch) {
    return api.signedPost('/leaderboard', {score, name}).then((json) => {
      loadScores()(dispatch)
      return json.id
    })
  }
}

export function stubScore(score, name) {
  return function(dispatch) {
    dispatch({type: 'leaderboard:insert', score: score, name: name})
  }
}
