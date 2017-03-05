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
    <View>
      <Text>Game Over!</Text>
      <Text>{this.props.score}</Text>

      <Text>{this.state.timer}</Text>
      <TouchableOpacity onPress={this.props.continue}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.reset}>
        <Text>Start Over</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({

})
