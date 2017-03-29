'use strict';

import api from './api'

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://eggpeg.superserious.co';

export function loadScores() {
  return function(dispatch) {
    return api.get('/leaderboard').then((json) => {
      dispatch({type: 'leaderboard:load', scores: json.scores })
    })
  }
}

export function postScore(score, name) {
  return function(dispatch) {
    return api.signedPost('/leaderboard', {score, name})
  }
}
