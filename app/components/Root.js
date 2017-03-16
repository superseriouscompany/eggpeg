'use strict';

import React from 'react';
import Component from './Component';
import FollowUs from './FollowUs';
import Start from './Start';
import Game from '../containers/Game';
import Halp from './Halp'
import Settings from './Settings'
import {Provider} from 'react-redux'
import branch from 'react-native-branch';
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
    // TODO: put all of this in another component
    let branchUniversalObject = branch.createBranchUniversalObject(
      `default`,
      {
        metadata: {
          link_type: 'default',
        }
      }
    )

    let linkProperties = {
      feature: 'friend-invitation',
      channel: 'app'
    }

    let controlParams = {
      '$ios_deepview': 'egg_peg_deepview_ckbe',
    }
    controlParams = {};

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
      store.dispatch({type: 'shareLink:set', shareLink: payload.url})
    })

    store.subscribe(() => {
      const state = store.getState()
      this.setState({
        scene: state.scene.current,
      })
    })

    // TODO: move this responsibility somewhere else
    this.hydrate()
  }

  render() { return (
    <View style={style.container}>
      <Provider store={store}>
        { this.state.scene == 'Game' ?
          <Game skipDemo={this.state.skipDemo}/>
        : this.state.scene == 'AboutUs' ?
          <FollowUs />
        : this.state.scene == 'Start' ?
          <Start shareLink={this.state.shareLink}/>
        : this.state.scene == 'Settings' ?
          <Settings />
        :
          <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
        }
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

    AsyncStorage.getItem('@eggpeg:passedDemo').then((yes) => {
      if( yes ) {
        this.setState({
          skipDemo: true,
        })
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
