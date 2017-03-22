'use strict';

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {AsyncStorage}     from 'react-native'
import {changeMode}       from '../actions/difficulty'

class MigrateProvider extends Component {
  componentDidMount() {
    AsyncStorage.getItem('@eggpeg:difficultyUnlocked').then((yes) => {
      if( !yes ) { return; }
      console.warn('Found old unlocked difficulty. Unlocking.');
      this.props.dispatch({type: 'difficulty:unlock'})
      return AsyncStorage.removeItem('@eggpeg:difficultyUnlocked')
    }).catch((err) => {
      console.error('Error migrating difficulty', err);
    })

    AsyncStorage.getItem('@eggpeg:passedDemo').then((yes) => {
      if( !yes ) { return; }
      console.warn('Found old unlocked demo. Unlocking.');
      this.props.dispatch({type: 'tutorial:complete'})
      return AsyncStorage.removeItem('@eggpeg:passedDemo');
    }).catch((err) => {
      console.error('Error migrating demo status', err);
    })

    AsyncStorage.getItem('@eggpeg:difficulty').then((difficulty) => {
      if( !difficulty ) { return; }
      console.warn('Found old difficulty setting. Unlocking.');
      this.props.dispatch(changeMode(difficulty));
      return AsyncStorage.removeItem('@eggpeg:difficulty');
    }).catch((err) => {
      console.error('Error migrating difficulty', err);
    })
  }

  render() { return this.props.children }
}

export default connect()(MigrateProvider)
