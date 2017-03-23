'use strict';

import api from './api'

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://eggpeg.superserious.co';

export function loadScores() {
  return function(dispatch) {
    return api.leaderboard.load().then((scores) => {
      dispatch({type: 'leaderboard:load', scores: scores })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export function postScore(score, name) {
  return function(dispatch) {
    return api.leaderboard.update(score, name).catch((err) => {
      console.error(err)
    })
  }
}
