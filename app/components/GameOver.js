'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import config             from '../config'
import sounds             from '../sounds'
import GameOverView       from '../views/GameOverView'
import {connect}          from 'react-redux'
import {Animated}         from 'react-native'

class GameOver extends Component {
  static propTypes = {
    reset:       PropTypes.func.isRequired,
    continue:    PropTypes.func.isRequired,
    paused:      PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.buyContinues = this.buyContinues.bind(this)
    this.exitPurchase = this.exitPurchase.bind(this)
    this.state = {
      enterAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(this.state.enterAnim, {
      duration: config.timings.gameOverIn, toValue: 1,
    }).start()
  }

  buyContinues() {
    this.setState({
      wantsPurchase: true
    })
  }

  exitPurchase() {
    this.setState({
      wantsPurchase: false
    })
  }

  render() { return (
    <GameOverView {...this.props}
      buyContinues={this.buyContinues}
      exitPurchase={this.exitPurchase}
      wantsPurchase={this.state.wantsPurchase}
      enterAnim={this.state.enterAnim} />
  )}
}

function mapStateToProps(state) {
  const score       = state.session.score;
  const leaderboard = state.leaderboard;

  let carrot = 'boss';
  for( var i = 0; i < leaderboard.length; i++ ) {
    if( leaderboard[i].score < score ) {
      carrot = i === 0 ? 'boss' : leaderboard[i-1]
      break;
    }
  }

  return {
    worldScore:  state.worlds.current.score,
    score:       score,
    leaderboard: leaderboard,
    carrot:      carrot,
    firstRun:    !state.session.goal,
    totalScore:  state.worlds.all.reduce((acc, w) => { return acc + (w.score || 0)}, 0),
    continues:   state.continues.count || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitHOF: () => {
      dispatch({type: 'scene:change', scene: 'HallOfFame', animation: 'dropIn'})
    },

    visitWorlds: () => {
      dispatch({type: 'scene:change', scene: 'Worlds'})
    },

    resume: () => {
      dispatch({type: 'worlds:resume'})
    },

    continue: (remaining) => {
      if( remaining == 0 ) {
        return alert('no continues remaining.')
      }
      dispatch({type: 'continues:use'})
      dispatch({type: 'level:continue'})
      if( remaining == 1 ) {
        alert('Should consume purchase here')
      }
    },

    buyContinues: () => {
      dispatch({type: 'scene:change', scene: 'ContinueBundles'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
