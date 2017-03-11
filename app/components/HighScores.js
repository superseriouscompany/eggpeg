'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class HighScores extends Component {
  static propTypes = {
    isHigh: PropTypes.bool.isRequired,
    score:  PropTypes.number,
    scores: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  render() { return (
    <View style={style.container}>
      { this.props.isHigh ?
        <Text style={style.highScore}>new high score!</Text>
      : null }
      {(this.props.scores || []).map((score, key) => (
        <Text key={key} style={style.highScore}>
          {this.props.isHigh && score === this.props.score ?
            <Text> 8===> </Text>
          : null }
          {key + 1}.
          {score}
        </Text>
      ))}
      { !this.props.isHigh ?
        <Text style={style.lowScore}>{this.props.score}</Text>
      : null }
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  highScore: {
    color: 'white',
    fontSize: 32,
  },
  lowScore: {
    fontSize: 32,
    color: '#BA6BC9',
  },
})
