'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton'
import HighScores from './HighScores'
import LinksHeader from './LinksHeader'
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
    <View style={style.container}>
      <LinksHeader textStyle={{color: 'white'}} />
      <View style={{flex: 1, alignItems: 'center', marginTop: 55}}>
        <HighScores scores={this.props.highScores} score={this.props.score} isHigh={this.props.isHighScore} />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          { !this.state.expired && this.props.highScores.length >= 3 ?
            <View style={style.continueContainer}>
              <PayButton style={style.button}
               countdown={this.state.timer}
               continue={this.props.continue}
               pause={this.pause}
               resume={this.resume} />
            </View>
          :
            <View style={style.continueContainer}>
              <View style={{height: 104, width: '100%'}}></View>
            </View>
          }
          <TouchableOpacity style={style.button}>
            <Text style={{fontStyle: 'italic', fontSize: 32, color: 'white'}}>game over</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#532D5A',
    flex:            1,
    alignItems:      'center',
  },
  countdown: {
    color: 'white',
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: 200,
    height: 75,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
})
