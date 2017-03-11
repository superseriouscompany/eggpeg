'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const {height} = Dimensions.get('window')

export default class ScoreText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaveAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.leaveAnim,
      { toValue: 1, duration: 2000, }
    ).start()
  }

  render() { return (
    <Animated.View style={[style.container, {
      bottom: this.state.leaveAnim.interpolate({
        inputRange: [0, .1, 0.5, 1],
        outputRange: [-32, 0, 0, height],
      }),
    }]}>
      <Text style={style.text}>hello</Text>
    </Animated.View>
  )}
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  text: {
    color: '#532D5A',
    fontSize: 32,
  },
})
