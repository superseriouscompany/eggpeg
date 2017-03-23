const initialState = {scores: []}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'leaderboard:load':
      return {
        ...state,
        scores: action.scores,
      }
    case 'leaderboard:insert':
      return {
        ...state,
        scores: insert(state.scores, action.score)
      }
    default:
      return state;
  }
}

function insert(scores, score) {
  let slot = -1;
  const copy = scores.slice()

  for( var i = 0; i < copy.length; i++ ) {
    if( score > copy[i] ) {
      slot = i;
      break;
    }
  }
  if( slot == -1 ) { return copy; }
  copy.splice(1, 1, score);
  return copy;
}
