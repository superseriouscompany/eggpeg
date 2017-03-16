const initialState = { unlocked: false, mode: 'easy'}
import {AsyncStorage} from 'react-native'

export default function(state = initialState, action) {
  switch(action.type) {
    case 'difficulty:unlock':
      AsyncStorage.setItem('@eggpeg:difficultyUnlocked', 'yes').catch((err) => {
        console.error('Failed to unlock difficulty', err)
      })

      return {
        ...state,
        unlocked: true,
      }
    case 'difficulty:set':
      return {
        ...state,
        mode: action.mode
      }
    default:
      return state
  }
}
