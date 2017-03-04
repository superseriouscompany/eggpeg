import config from '../config'

export default function bullet(state = config.bullet, action) {
  switch(action.type) {
    case 'bullet:fire':
      return {
        ...state,
        time: +new Date,
        x: action.x,
        shadow: 1,
      }
    case 'bullet:show':
      return {
        ...state,
        visible: true,
        shadow: 0,
      }
    case 'bullet:hide':
      return {
        ...state,
        visible: false,
      }
    case 'bullet:updateShadow':
      return {
        ...state,
        shadow: action.size,
      }
    default:
      return state;
  }
}
