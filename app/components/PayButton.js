'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PayButton extends Component {
  render() { return (
    <TouchableOpacity style={style.pay} onPress={this.pay}>
      <Text>pay</Text>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  pay: {
    position: 'absolute',
    right: 0,
  },
})
