import {createStore, combineReducers} from 'redux';

import bullet from './bullet'

const reducers = combineReducers([
  bullet,
])

const store = createStore(reducers)

export default store
