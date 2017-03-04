import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import bullets from './bullets'
import chamber from './chamber'
import head   from './head'
import result from './result'

const reducers = combineReducers({
  bullets,
  chamber,
  head,
  result,
})
const middleware = []
if( false && __DEV__ ) {
  middleware.push(createLogger())
}

const store = createStore(reducers,applyMiddleware(...middleware))

export default store
