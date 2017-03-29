'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import PayButton          from './PayButton'
import HighScores         from './HighScores'
import LinksHeader        from './LinksHeader'
import SettingsLink       from './SettingsLink'
import DifficultySwitch   from './DifficultySwitch'
import config             from '../config'
import sounds             from '../sounds'
import {connect}          from 'react-redux'
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
    if( this.props.isHighScore ) {
      sounds.woohoo.play(null, (err) => {
        console.error(err)
      })
    } else {
      sounds.fart.play(null, (err) => {
        console.error(err)
      })
    }
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
      <View style={[style.top, {

      }]}>
        <Text style={style.score}>{this.props.score}!</Text>
        <Text style={style.carrot}>
          <Text style={{color: 'hotpink'}}>Y</Text> 187
        </Text>

        <TouchableOpacity onPress={() => alert('nope')}>
          <Text style={style.topScores}>top scores</Text>
        </TouchableOpacity>
      </View>

      <View style={[style.bottom, {
      }]}>
        <TouchableOpacity style={[style.button, style.retry]} onPress={this.props.reset}>
          <Text style={[style.buttonText, {color: 'hotpink'}]}>Q</Text>
        </TouchableOpacity>
        <PayButton style={[style.button, style.continueButton]} textStyle={style.buttonText} continue={this.props.continue} />
      </View>
      <SettingsLink />
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position:        'absolute',
    left:            0,
    right:           0,
    top:             0,
    bottom:          0,
    zIndex:          1,
  },
  top: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  countdown: {
    color: 'white',
  },
  score: {
    fontSize: 64,
    color:    'white',
  },
  carrot: {
    fontSize: 18,
    color:    'white',
  },
  topScores: {
    color:     'white',
    fontStyle: 'italic',
  },
  bottom: {
    flexDirection:  'row',
    paddingLeft:    31,
    paddingRight:   31,
    paddingBottom:  27,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius:    5,
    paddingLeft:     26,
    paddingRight:    26,
    paddingTop:      14,
    paddingBottom:   20,
    alignItems:      'center',
    justifyContent:  'center',
  },
  continueButton: {
    width:  174.5,
    height: 77,
  },
  retry: {
    marginRight: 9,
  },
  buttonText: {
    color: '#4A4A4A',
    fontStyle: 'italic',
    fontSize: 32,
  },
})

export default connect()(GameOver)
