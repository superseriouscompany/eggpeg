'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Victory extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
  }

  render() { return (
    <TouchableOpacity onPress={this.props.reset} style={style.container}>
      <Text>You win!</Text>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  }
})
