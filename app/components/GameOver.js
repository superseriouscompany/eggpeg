'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import PayButton          from './PayButton'
import HighScores         from './HighScores'
import RainbowBar         from './RainbowBar'
import config             from '../config'
import sounds             from '../sounds'
import {connect}          from 'react-redux'
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class GameOver extends Component {
  static propTypes = {
    reset:       PropTypes.func.isRequired,
    continue:    PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.countdown = this.countdown.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.showSettings = this.showSettings.bind(this)
    this.state = {
      timer: config.countdown,
      enterAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.timeout = setInterval(this.countdown, 1000)
    const {scores} = this.props.leaderboard;
    const {score}  = this.props;

    // TODO: move this out of here
    // if( !scores.length ) {
    //   this.props.dispatch({type: 'scene:change', scene: 'HallOfFame'})
    //   return;
    // }
    // for( var i = 0; i < scores.length; i++ ) {
    //   if( scores[i].score < score ) {
    //     this.props.dispatch({type: 'scene:change', scene: 'HallOfFame'})
    //     return;
    //   }
    // }

    if( this.props.isHighScore ) {
      sounds.woohoo.play(null, (err) => {
        console.error(err)
      })
    } else {
      sounds.fart.play(null, (err) => {
        console.error(err)
      })
    }

    Animated.timing(this.state.enterAnim, {
      duration: config.timings.gameOverIn, toValue: 1,
    }).start()
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
      <Animated.View style={[style.top, {
        marginTop: this.state.enterAnim.interpolate({
          inputRange:  [0, 1],
          outputRange: [-1000, 0],
        })
      }]}>

        { this.props.score > this.props.highScore ?
          <RainbowBar />
        : null }
        <Text style={style.score}>{this.props.score}!</Text>
        { this.props.score < this.props.highScore ?
          <Text style={style.carrot}>
            <Text style={{color: 'hotpink'}}>Y</Text> {this.props.highScore}
          </Text>
        : this.props.carrot !== 'boss' ?
          <Text style={style.carrot}>default {this.props.carrot.name}'s {this.props.carrot.score}</Text>
        :
          <Text style={style.carrot}>you're a boss.</Text>
        }

        <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:change', scene: 'HallOfFame'})}>
          <Text style={style.topScores}>top scores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.leftNav}>
          <View style={[style.button, {height: 38, width: 38, paddingLeft: 1}]}>
            <Image source={require('../images/HomeIcon.png')}/>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[style.bottom, {
        marginBottom: this.state.enterAnim.interpolate({
          inputRange:  [0, 1],
          outputRange: [-200, 0],
        })
      }]}>
        <TouchableOpacity style={[style.button, style.retry]} onPress={this.props.reset}>
          <Text style={[style.buttonText, {color: 'hotpink'}]}>Q</Text>
        </TouchableOpacity>
        <PayButton style={[style.button, style.continueButton]} textStyle={style.buttonText} continue={this.props.continue} />
      </Animated.View>
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
  leftNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
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

function mapStateToProps(state) {
  const score       = state.score.total;
  const leaderboard = state.leaderboard;

  let carrot = 'boss';
  for( var i = 0; i < leaderboard.length; i++ ) {
    if( leaderboard[i].score < score ) {
      carrot = i === 0 ? 'boss' : leaderboard[i-1]
      break;
    }
  }

  return {
    score:       score,
    highScore:   state.score.highScores && state.score.highScores[0],
    leaderboard: leaderboard,
    carrot:      carrot,
  }
}

export default connect(mapStateToProps)(GameOver)
