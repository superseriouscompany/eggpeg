import config from '../config'

export default function(state = config.chamber, action) {
  switch(action.type) {
    case 'bullet:fire':
      return Math.max(0, state - 1);
    case 'result:retry':
      return config.chamber;
    default:
      return state
  }
}
