import config from '../config'

export default function(state = config.chamber, action) {
  switch(action.type) {
    case 'bullets:fire':
      return Math.max(0, state - 1);
    case 'result:retry':
      return config.chamber;
    default:
      return state
  }
}