'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 0, squareWidth: 10, windowWidth: Dimensions.get('window').width, dir: 1}
    this.updateGameState = this.updateGameState.bind(this)
  }

  componentDidMount() {
    this.updateGameState();
  }

  updateGameState() {
    const {squareWidth, x, windowWidth} = this.state
    let {dir} = this.state

    if( dir == 1 && (x + squareWidth) >= windowWidth ) { dir = -1 }
    if( dir == -1 && x <= 0 ) { dir = 1 }
    this.setState({
      x: x + dir,
      dir: dir
    })

    setTimeout(this.updateGameState, 10)
  }

  render() { return (
    <View style={style.container}>
      <View style={[style.head, {left: this.state.x, width: this.state.squareWidth, height: this.state.squareWidth}]}></View>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  head: {
    backgroundColor: 'slateblue',
    position: 'absolute',
  },
})
