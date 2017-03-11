'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
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
          <Text style={style.explanation}>new high score!</Text>
        : null }
      </View>

      <View style={style.scoresContainer}>
        { this.props.isHigh ?
          <View style={style.barContainer}>
            <Bar color={base.colors.green} />
            <Bar color={base.colors.yellow} />
            <Bar color={base.colors.orange} />
            <Bar color={base.colors.red} />
            <Bar color={base.colors.purple} />
            <Bar color={base.colors.blue} />
          </View>
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

function Bar(props) {
  return (
    <View style={[style.bar, {backgroundColor: props.color}]} />
  )
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
    marginTop: 40,
  },
  star: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'hotpink',
  },
  bar: {
    height: barHeight,
    width: '100%'
  },
  barContainer: {
    position: 'absolute',
  },
  scoresContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: barHeight * 6
  },
  scoreboard: {
    alignItems: 'center',
  }
})
