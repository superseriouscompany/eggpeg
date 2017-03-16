import {
  AsyncStorage
} from 'react-native'

export function loadScores() {
  return function(dispatch) {
    Promise.resolve().then(() => {
      return AsyncStorage.getItem('@eggpeg:highscores')
    }).then((payload) => {
      const scores = payload && JSON.parse(payload) || []
      dispatch({type: 'score:setHighScores', isHigh: false, scores})
    })
  }
}

export function recordScore(score) {
  return function(dispatch) {
    let newHighScore = false;
    if( !score ) { return Promise.resolve(false) }

    return Promise.resolve().then(() => {
      return AsyncStorage.getItem('@eggpeg:highscores')
    }).then((payload) => {
      const scores = payload && JSON.parse(payload) || []
      let place = -1;
      if( !scores.length ) {
        place = 0
      } else {
        for( var i = 0; i < 3; i++ ) {
          if( i >= scores.length || scores[i] <= score ) {
            place = i;
            break;
          }
        }
      }
      if( place === -1 ) {
        dispatch({type: 'score:setHighScores', isHigh: false, scores})
        return false;
      }

      scores.splice(place, 0, score)
      scores.length > 3 && scores.pop()

      dispatch({type: 'score:setHighScores', isHigh: true, scores})
      return AsyncStorage.setItem('@eggpeg:highscores', JSON.stringify(scores))
    })
  }
}
