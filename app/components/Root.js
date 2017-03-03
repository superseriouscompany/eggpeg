'use strict';

import React from 'react';
import Component from './Component';
import FollowUs from './FollowUs';
import Text from './Text';
import Start from './Start';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.startGame = this.startGame.bind(this)
    this.showAbout = this.showAbout.bind(this)
    this.showStart = this.showStart.bind(this)
  }

  render() { return (
    <View style={style.container}>
      { this.state.playing ?
        <View>
          <Text style={{padding: 20}}>Da Game</Text>
        </View>
      : this.state.aboutUs ?
        <FollowUs back={this.showStart}/>
      :
        <Start showAbout={this.showAbout} startGame={this.startGame} />
      }
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
    paddingTop: 20,
  },
})
