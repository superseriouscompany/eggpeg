import variables from '../variables'

export default function bullet(state = variables.bullet, action) {
  switch(action.type) {
    case 'bullet:fire':
      return {
        ...state,
        time: +new Date,
        x: action.x,
      }
    case 'bullet:show':
      return {
        ...state,
        visible: true,
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
