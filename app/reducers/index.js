import {persistStore, autoRehydrate} from 'redux-persist'
import createLogger                  from 'redux-logger';
import {AsyncStorage}                from 'react-native'
import thunk                         from 'redux-thunk';

import bullets    from './bullets'
import chamber    from './chamber'
import level      from './level'
import targets    from './targets'
import score      from './score'
import purchase   from './purchase'
import scene      from './scene'
import shareLink  from './shareLink'
import victory    from './victory'
import difficulty from './difficulty'
import tutorial   from './tutorial'

import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

const reducers = combineReducers({
  bullets,
  chamber,
  level,
  targets,
  score,
  purchase,
  scene,
  shareLink,
  victory,
  difficulty,
  tutorial,
})
const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(createLogger({
    predicate: (getState, action) => action.type != 'tick'
  }))
}

const store = createStore(reducers, undefined, compose(
  applyMiddleware(...middleware),
  autoRehydrate()
))

persistStore(store, {storage: AsyncStorage})

export default store
