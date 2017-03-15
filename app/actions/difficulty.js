import config, {changeConfig} from '../config'

export function changeMode(mode) {
  return function(dispatch) {
    if( mode === 'easy' ) {
      changeConfig({
        sizes: {
          ...config.sizes,
          target: 40,
        }
      })
      dispatch({type: 'difficulty:set', mode: mode})
    } else if( mode === 'hard' ) {
      changeConfig({
        sizes: {
          ...config.sizes,
          target: 20,
        }
      })
      dispatch({type: 'difficulty:set', mode: mode})
    } else {
      console.warn(`Unknown difficulty value ${mode}`)
    }
  }
}
