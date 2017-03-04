import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import bullet from './bullet'
import head   from './head'

const reducers = combineReducers({
  bullet,
  head,
})
const middleware = []
if( __DEV__ ) {
  middleware.push(createLogger())
}

const store = createStore(reducers,applyMiddleware(...middleware))

export default store
