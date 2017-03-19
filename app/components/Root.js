'use strict';

import React from 'react';
import Component from './Component';
import FollowUs from './FollowUs';
import Start from './Start';
import Game from '../containers/Game';
import Settings from './Settings'
import DeeplinkProvider from '../containers/DeeplinkProvider'
import IAPProvider from '../containers/IAPProvider'
import {Provider} from 'react-redux'
import store from '../reducers'
import {changeMode} from '../actions/difficulty'
import {
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = { scene: 'Start' }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      if( state.scene.current ) {
        this.setState({
          scene: state.scene.current,
        })
      }
    })
  }

  render() { return ( // TODO: add MigrateProvider
    <View style={style.container}>
      <Provider store={store}>
        <DeeplinkProvider>
          <IAPProvider>
            { this.state.scene == 'Game' ?
              <Game />
            : this.state.scene == 'AboutUs' ?
              <FollowUs />
            : this.state.scene == 'Start' ?
              <Start shareLink={this.state.shareLink}/>
            : this.state.scene == 'Settings' ?
              <Settings />
            :
              <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
            }
          </IAPProvider>
        </DeeplinkProvider>
      </Provider>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
