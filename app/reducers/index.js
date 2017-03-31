import {persistStore, autoRehydrate} from 'redux-persist'
import createLogger                  from 'redux-logger';
import {AsyncStorage}                from 'react-native'
import thunk                         from 'redux-thunk';
import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

// Register reducers from this directory. http://redux.js.org/docs/api/combineReducers.html
import bullets     from './bullets'
import chamber     from './chamber'
import difficulty  from './difficulty'
import leaderboard from './leaderboard'
import level       from './level'
import purchase    from './purchase'
import retry       from './retry'
import scene       from './scene'
import score       from './score'
import shareLink   from './shareLink'
import targets     from './targets'
import tutorial    from './tutorial'
import victory     from './victory'
import worlds     from './worlds'

const reducers = combineReducers({
  bullets,
  chamber,
  leaderboard,
  level,
  targets,
  score,
  purchase,
  retry,
  scene,
  shareLink,
  victory,
  difficulty,
  tutorial,
  worlds,
})

// Add middleware http://redux.js.org/docs/advanced/Middleware.html
const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(createLogger({
    predicate: (getState, action) => action.type != 'tick'
  }))
}

// Apply reducers and middleware from above with redux persistence
const store = createStore(reducers, undefined, compose(
  applyMiddleware(...middleware),
  autoRehydrate()
))

const persistence = persistStore(store, {storage: AsyncStorage, whitelist: [
  'difficulty',
  'purchase',
  'retry',
  'score',
  'shareLink',
  'tutorial',
  'worlds',
]})

export default store

export function clear() {
  persistence.purge()
}
