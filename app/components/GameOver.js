'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton'
import config from '../config'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class GameOver extends Component {
  static propTypes = {
    score:    PropTypes.number.isRequired,
    reset:    PropTypes.func.isRequired,
    continue: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.countdown = this.countdown.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.state = { timer: config.countdown }
  }

  componentDidMount() {
    this.timeout = setInterval(this.countdown, 1000)
  }

  componentWillUnmount() {
    this.timeout && clearInterval(this.timeout)
  }

  pause() {
    this.timeout && clearInterval(this.timeout)
  }

  resume() {
    this.timeout = setInterval(this.countdown, 1000)
  }

  countdown() {
    if( this.state.timer <= 0 ) {
      this.setState({
        expired: true,
      })
      return clearInterval(this.timeout)
    }
    this.setState({
      timer: this.state.timer - 1
    })
  }

  render() { return (
    <TouchableOpacity onPress={this.props.reset} style={{flex: 1}}>
      <View style={style.container}>
        <View style={style.scoreContainer}>
          <Text style={style.score}>{this.props.score}</Text>
        </View>
        {(this.props.highScores || []).map((score, key) => (
          <Text key={key}>{key + 1}. {score}</Text>
        ))}
        { this.props.isHighScore ?
          <Text>New High Score!</Text>
        : null }
        { !this.state.expired ?
          <View style={style.continueContainer}>
            <Text style={style.countdown}>{this.state.timer}</Text>
            <PayButton continue={this.props.continue} pause={this.pause} resume={this.resume}/>
          </View>
        : null
        }
      </View>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#532D5A',
    flex:            1,
    alignItems:      'center',
  },
  scoreContainer: {
    flex:           1,
    justifyContent: 'center',
  },
  score: {
    fontSize: 64,
    color:    '#BA6BC9',
  },
  continueContainer: {
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   41,
  },
  countdown: {
    color: 'white',
  },
})
