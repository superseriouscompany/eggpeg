import {
  AsyncStorage
} from 'react-native'

export function recordScore(score) {
  return AsyncStorage.getItem('@eggpeg:highscores').then((payload) => {
    const scores = payload && JSON.parse(payload) || []
    scores.push(score)
    console.warn(scores);
    return AsyncStorage.setItem('@eggpeg:highscores', JSON.stringify(scores))
  })
}
