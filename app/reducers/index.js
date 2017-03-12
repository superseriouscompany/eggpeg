import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import bullets from './bullets'
import chamber from './chamber'
import level from './level'
import targets from './targets'
import score from './score'
import purchase from './purchase'
import scene from './scene'
import shareLink from './shareLink'
import thunk from 'redux-thunk';

const reducers = combineReducers({
  bullets,
  chamber,
  level,
  targets,
  score,
  purchase,
  scene,
  shareLink,
})
const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(createLogger({
    predicate: (getState, action) => action.type != 'tick'
  }))
}

const store = createStore(reducers,applyMiddleware(...middleware))

export default store
