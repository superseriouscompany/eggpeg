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
    win:       PropTypes.bool.isRequired,
    retry:     PropTypes.func.isRequired,
    nextLevel: PropTypes.func.isRequired,
  }

  render() { return (
    <TouchableOpacity onPress={this.props.win ? this.props.nextLevel : this.props.retry} style={style.container}>
      { this.props.win ?
        <View style={style.text}>
          <Text>cleared!</Text>
          <Text>{this.props.score}pts</Text>
        </View>
      :
        <View style={style.text}>
          <Text>game over!</Text>
          <Text>{this.props.score}</Text>
        </View>
      }
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  text: {
    color: 'gainsboro',
  },
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
})
