'use strict';

import React               from 'react'
import {Provider}          from 'react-redux'
import DeeplinkProvider    from '../providers/DeeplinkProvider'
import IAPProvider         from '../providers/IAPProvider'
import MigrateProvider     from '../providers/MigrateProvider'
import DevProvider         from '../providers/DevProvider'
import LeaderboardProvider from '../providers/LeaderboardProvider'
import MusicProvider       from '../providers/MusicProvider'
import store               from '../reducers'
import Stage               from './Stage'
import {
  View,
} from 'react-native';

export default function Root() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stage />
        <View>
          <DeeplinkProvider />
          <IAPProvider />
          <MigrateProvider />
          <LeaderboardProvider />
          <DevProvider />
          <MusicProvider />
        </View>
      </View>
    </Provider>
  )
}
