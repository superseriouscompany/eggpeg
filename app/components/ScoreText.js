'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

export default class ScoreText extends Component {
  render() { return (
    <View style={style.container}>
      <Text style={style.text}>hello</Text>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -2,
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },

  text: {
    color: '#532D5A',
    fontSize: 32,
  },
})
