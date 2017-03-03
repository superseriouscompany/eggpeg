'use strict';

import React from 'react';
import Component from './Component';
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
  }

  render() { return (
    <View style={style.container}>
      { this.state.playing ?
        <View>
          <Text style={{padding: 20}}>Da Game</Text>
        </View>
      : this.state.aboutUs ?
        <View>
          <Text style={{padding: 20}}>follow us</Text>
        </View>
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
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
})
