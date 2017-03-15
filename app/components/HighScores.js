'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
import RainbowBar from './RainbowBar';
import Text from './Text';
import base from '../styles/base'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class HighScores extends Component {
  static propTypes = {
    isHigh: PropTypes.bool.isRequired,
    score:  PropTypes.number,
    scores: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  render() {
    let gaveHighScore = false;
  return (
    <View style={style.container}>
      <View style={style.explanationContainer}>
        { this.props.isHigh ?
          <Text style={[style.explanation, this.props.explanationStyle]}>{this.props.explanationText}</Text>
        : null }
      </View>

      <View style={style.scoresContainer}>
        { this.props.isHigh ?
          <RainbowBar />
        : null }

        <View style={style.scoreboard}>
          {(this.props.scores || []).map((score, key) => (
            <Text key={key} style={style.highScore}>
              { this.props.scores.length > 1 ?
                <Text style={style.highScore}>{key + 1}&nbsp;&nbsp;{score}</Text>
              :
                <Text style={style.highScore}>{score}</Text>
              }
              { this.props.isHigh && !gaveHighScore && score === this.props.score ? (gaveHighScore = true) && '!' : ' ' }
            </Text>
          ))}
        </View>
      </View>
      { !this.props.isHigh ?
        <Text style={style.lowScore}>{this.props.score}!</Text>
      : null }
    </View>
  )}
}

const barHeight = 25;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanation: {
    color: 'white',
    fontSize: 32,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  highScore: {
    color: 'white',
    fontSize: 32,
    backgroundColor: 'transparent'
  },
  lowScore: {
    fontSize: 32,
    color: 'white',
    marginTop: 10,
  },
  scoresContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: barHeight * 6
  },
  scoreboard: {
    alignItems: 'flex-start',
  }
})
