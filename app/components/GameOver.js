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
  View,
} from 'react-native';

export default class GameOver extends Component {
  static propTypes = {
    score:       PropTypes.number.isRequired,
    reset:       PropTypes.func.isRequired,
    continue:    PropTypes.func.isRequired,
    isHighScore: PropTypes.bool.isRequired,
    highScores:  PropTypes.arrayOf(PropTypes.number).isRequired,
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
      <HighScores explanationText={'new high score!'} scores={this.props.highScores} score={this.props.score} isHigh={this.props.isHighScore} />

      <View style={style.buttonsContainer}>
        { !this.state.expired && this.props.highScores.length >= 3 ?
          <View style={style.continueContainer}>
            <PayButton style={style.button}
             countdown={this.state.timer}
             continue={this.props.continue}
             pause={this.pause}
             resume={this.resume} />
          </View>
        : null
        }
        <Text style={style.button}>game over</Text>
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
  buttonsContainer: {
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   41,
  },
  countdown: {
    color: 'white',
  },
  button: {
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
    width:         220,
    textAlign: 'center',
  },
})
