import config from '../config'

export default function(state = config.chamber, action) {
  switch(action.type) {
    case 'bullets:fire':
      return Math.max(0, state - 1);
    case 'bullets:hit':
    case 'chamber:reload':
      return state + 1
    case 'level:clear':
      return config.chamber;
    default:
      return state
  }
}
