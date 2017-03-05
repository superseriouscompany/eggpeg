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
    highScores: PropTypes.arrayOf(PropTypes.shape({
	    score:      PropTypes.score,
      time:       PropTypes.date,
	  })),
  }

  render() { return (
    <TouchableOpacity onPress={this.props.reset} style={style.container}>
      <Text>
        You win! &nbsp;
        <Text>{this.props.score}</Text>
      </Text>

      {this.props.highScores.map((s, key) => (
        <Text key={key} style={s.score == this.props.score ? style.newHighScore : null}>{s.score}</Text>
      ))}
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  newHighScore: {
    color: 'goldenrod',
  }
})
