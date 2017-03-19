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

    // TODO: move this responsibility somewhere else
    this.hydrate()
  }

  render() { return (
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

  // TODO: noooooooo, move this responsibility out or persist entire store
  hydrate() {
    AsyncStorage.getItem('@eggpeg:difficultyUnlocked').then((yes) => {
      if( yes ) {
        store.dispatch({type: 'difficulty:unlock'})
      }
    })

    AsyncStorage.getItem('@eggpeg:difficulty').then((difficulty) => {
      if( difficulty ) {
        store.dispatch(changeMode(difficulty))
      }
    })
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
