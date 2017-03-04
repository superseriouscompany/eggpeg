import config from '../config'

export default function bullet(state = config.bullet, action) {
  switch(action.type) {
    case 'bullet:fire':
      return {
        ...state,
        time: +new Date,
        x: action.x,
        shadow: true,
      }
    case 'bullet:show':
      return {
        ...state,
        visible: true,
        shadow: false,
      }
    case 'bullet:hide':
      return {
        ...state,
        visible: false,
      }
    default:
      return state;
  }
}
