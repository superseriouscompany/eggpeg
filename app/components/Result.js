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
    nextLevel:  PropTypes.func.isRequired,
    score:      PropTypes.number.isRequired,
    levelScore: PropTypes.number.isRequired,
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.nextLevel()
    }, 1250)
  }

  render() { return (
    <TouchableOpacity onPress={this.props.nextLevel} style={style.container}>
      <View style={style.scoreContainer}>
        <Text style={style.score}>{this.props.score}!</Text>
      </View>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: '#BA6BCA',
  },
  scoreContainer: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  score: {
    color: '#8B5096',
    fontSize: 64,
  },
})
