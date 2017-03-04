import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import bullet from './bullet'
import head   from './head'
import chamber from './chamber'
import result from './result'

const reducers = combineReducers({
  bullet,
  head,
  chamber,
  result,
})
const middleware = []
if( false && __DEV__ ) {
  middleware.push(createLogger())
}

const store = createStore(reducers,applyMiddleware(...middleware))

export default store
