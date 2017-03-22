import config, {changeConfig} from '../config'
import {AsyncStorage}         from 'react-native'

export function changeMode(mode) {
  return function(dispatch) {
    if( mode !== 'easy' && mode !== 'hard' ) { return console.warn(`Unknown difficulty value ${mode}`) }
    if( mode === 'easy' ) {
      changeConfig({
        sizes: {
          ...config.sizes,
          target: 40,
        },
        scoreBonus: 1,
      })
      dispatch({type: 'difficulty:set', mode: mode})
    } else {
      changeConfig({
        sizes: {
          ...config.sizes,
          target: 20,
        },
        scoreBonus: 2,
      })
      dispatch({type: 'difficulty:set', mode: mode})
    }
  }
}
