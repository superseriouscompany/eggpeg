export default function(state = '', action) {
  switch(action.type) {
    case 'shareLink:set':
      return action.shareLink
    default:
      return state
  }
}
