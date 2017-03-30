'use strict';

import api from './api'

export function loadScores() {
  return function(dispatch) {
    return api.get('/leaderboard').then((json) => {
      dispatch({type: 'leaderboard:load', scores: json.scores })
    })
  }
}

export function postScore(score, name) {
  return function(dispatch) {
    return api.signedPost('/leaderboard', {score, name}).then(() => {
      return loadScores()(dispatch)
    })
  }
}

export function stubScore(score, name) {
  return function(dispatch) {
    dispatch({type: 'leaderboard:insert', score: score, name: name})
  }
}
