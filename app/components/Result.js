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
    reset:     PropTypes.func.isRequired,
    nextLevel: PropTypes.func.isRequired,
  }

  render() { return (
    <TouchableOpacity onPress={this.props.win ? this.props.nextLevel : this.props.reset} style={style.container}>
      { this.props.win ?
        <View>
          <Text style={style.text}>cleared!</Text>
          <Text style={style.text}>{this.props.score}pts</Text>
        </View>
      :
        <View>
          <Text style={style.text}>game over!</Text>
          <Text style={style.text}>{this.props.score}pts</Text>
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
