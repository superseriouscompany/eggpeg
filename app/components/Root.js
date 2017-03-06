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

let playing = false;

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = { playing: playing }
    this.startGame = this.startGame.bind(this)
    this.showAbout = this.showAbout.bind(this)
    this.showStart = this.showStart.bind(this)
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
  }

  render() { return (
    <View style={style.container}>
      <Provider store={store}>
        { this.state.playing ?
          <Game />
        : this.state.aboutUs ?
          <FollowUs back={this.showStart}/>
        :
          <Start showAbout={this.showAbout} startGame={this.startGame} shareLink={this.state.shareLink}/>
        }
      </Provider>
    </View>
  )}

  showAbout() {
    this.setState({aboutUs: true})
  }

  startGame() {
    this.setState({playing: true})
  }

  showStart() {
    this.setState({aboutUs: false, playing: false,})
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
