import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import bullets from './bullets'
import chamber from './chamber'
import level from './level'
import targets from './targets'

const reducers = combineReducers({
  bullets,
  chamber,
  level,
  targets,
})
const middleware = []
if( false && __DEV__ ) {
  middleware.push(createLogger())
}

const store = createStore(reducers,applyMiddleware(...middleware))

export default store
