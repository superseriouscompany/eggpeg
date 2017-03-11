'use strict';

import React from 'react';
import Component from './Component';
import FollowUs from './FollowUs';
import Start from './Start';
import Game from '../containers/Game';
import {Provider} from 'react-redux'
import branch from 'react-native-branch';
import store from '../reducers'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

let scene = 'Start';
// scene = 'Game'

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.startGame = this.startGame.bind(this)
    this.showStart = this.showStart.bind(this)
    this.state = { scene: scene }
  }

  componentDidMount() {
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
      '$ios_deepview': 'floats_deepview_vk8d',
    }
    controlParams = {};

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
      this.setState({
        shareLink: payload.url,
      })
    })

    store.subscribe(() => {
      const state = store.getState()
      this.setState({
        scene: state.scene,
      })
    })
  }

  render() { return (
    <View style={style.container}>
      <Provider store={store}>
        { this.state.scene == 'Game' ?
          <Game/>
        : this.state.scene == 'AboutUs' ?
          <FollowUs back={this.showStart}/>
        : this.state.scene == 'Start' ?
          <Start shareLink={this.state.shareLink}/>
        :
          <Text>404</Text>
        }
      </Provider>
    </View>
  )}

  startGame() {
    this.setState({scene: 'Game'})
  }

  showStart() {
    this.setState({scene: 'Start'})
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
