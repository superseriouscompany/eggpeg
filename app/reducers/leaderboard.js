const initialState = {scores: []}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'leaderboard:loading':
      return {
        ...state,
        loading: true,
      }
    case 'leaderboard:load':
      return {
        ...state,
        scores: action.scores,
        loading: false,
      }
    case 'leaderboard:load:failed':
      return {
        ...state,
        loading: false,
        err:     action.err,
      }
    case 'leaderboard:insert':
      return {
        ...state,
        scores: insert(state.scores, {score: action.score, name: action.name})
      }
    default:
      return state;
  }
}

function insert(scores, score) {
  if( !scores.length ) {
    return [score]
  }

  let slot = -1;
  const copy = scores.slice()

  for( var i = 0; i < copy.length; i++ ) {
    if( score.score > copy[i].score ) {
      slot = i;
      break;
    }
  }
  if( slot == -1 ) { return copy; }
  copy.splice(slot, 0, score);
  return copy;
}
