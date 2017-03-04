'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Result extends Component {
  static propTypes = {
    win:   PropTypes.bool.isRequired,
    retry: PropTypes.func.isRequired,
  }

  render() { return (
    <TouchableOpacity onPress={this.props.retry} style={style.container}>
      { this.props.win ?
        <Text>You won!</Text>
      :
        <Text>You lost.</Text>
      }
      <Text>Tap anywhere to retry.</Text>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
})
