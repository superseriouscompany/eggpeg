'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton'
import HighScores from './HighScores'
import LinksHeader from './LinksHeader'
import SettingsLink from './SettingsLink'
import DifficultySwitch from './DifficultySwitch'
import config from '../config'
import {connect} from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class GameOver extends Component {
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
    this.showSettings = this.showSettings.bind(this)
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

  showSettings() {
    this.props.dispatch({type: 'scene:change', scene: 'Settings'})
  }

  render() { return (
    <View style={style.container}>
      <LinksHeader textStyle={{color: 'white'}} />
      <View style={style.mainContainer}>
        <HighScores explanationText={'high score!'} scores={this.props.highScores} score={this.props.score} isHigh={this.props.isHighScore} />
      </View>

      <View style={style.buttonsContainer}>
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
            <View style={{height: 91, width: '100%'}}></View>
          </View>
        }
        <TouchableOpacity style={style.button} onPress={this.props.reset}>
          <Text style={{fontStyle: 'italic', fontSize: 32, color: 'white'}}>game over</Text>
        </TouchableOpacity>
        <DifficultySwitch dark={true} style={{marginTop: 20}}/>
      </View>
      <SettingsLink />
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#532D5A',
    flex:            1,
    alignItems:      'center',
  },
  mainContainer: {
    flex: .4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonsContainer: {
    flex: .6,
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect()(GameOver)
