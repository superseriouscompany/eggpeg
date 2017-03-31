'use strict';

import React               from 'react';
import {Provider}          from 'react-redux'
import Component           from './Component'
import Stage               from './Stage'
import DeeplinkProvider    from '../providers/DeeplinkProvider'
import IAPProvider         from '../providers/IAPProvider'
import MigrateProvider     from '../providers/MigrateProvider'
import LeaderboardProvider from '../providers/LeaderboardProvider'
import DevProvider         from '../providers/DevProvider'
import store               from '../reducers'
import sounds              from '../sounds'
import config              from '../config'
import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
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
        </View>
      </View>
    </Provider>
  )
}
