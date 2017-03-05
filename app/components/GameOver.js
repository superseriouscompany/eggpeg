'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
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
    this.state = { timer: config.countdown }
  }

  componentDidMount() {
    this.timeout = setInterval(this.countdown, 1000)
  }

  componentWillUnmount() {
    this.timeout && clearInterval(this.timeout)
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
        <View style={style.continueContainer}>
          <Text style={style.countdown}>{this.state.timer}</Text>
          <TouchableOpacity onPress={this.props.continue}>
            <Text style={style.continue}>continue?</Text>
          </TouchableOpacity>
          <Text style={style.explanation}>keep playing for 99¢</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#5C3463',
    flex:            1,
    alignItems:      'center',
  },
  scoreContainer: {
    flex:           1,
    justifyContent: 'center',
  },
  score: {
    fontSize: 64,
    color:    '#8B5096',
  },
  continueContainer: {
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   41,
  },
  countdown: {
    color: 'white',
  },
  continue: {
    fontSize:      32,
    color:         'white',
    paddingTop:    14,
    paddingBottom: 20,
    paddingLeft:   31,
    paddingRight:  31,
    borderColor:   'white',
    borderWidth:   1,
    borderRadius:  5,
    marginTop:     16,
    marginBottom:  10,
  },
  explanation: {
    color: 'white',
  },
})
