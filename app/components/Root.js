'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
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
        <View>
          <View style={style.header}>
            <TouchableOpacity style={style.who} onPress={this.showAbout}>
              <Text>who dis?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.pay}>
              <Text>pay</Text>
            </TouchableOpacity>
          </View>
          <View style={style.main}>
            <TouchableOpacity onPress={this.startGame}>
              <Text>start</Text>
            </TouchableOpacity>
          </View>
          <View style={style.footer}>
            <TouchableOpacity>
              <Text>footer</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  }
})
