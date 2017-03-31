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
  }

  constructor(props) {
    super(props)
    this.state = {
      enterAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    const {scores} = this.props.leaderboard;
    const {totalScore, score, worldScore}  = this.props;

    if( score >= worldScore ) {
      sounds.woohoo.play(null, (err) => {
        console.error(err)
      })

      // TODO: move this out of here
      for( var i = 0; i < scores.length; i++ ) {
        if( scores[i].score < totalScore ) {
          this.props.induct(totalScore)
          return;
        }
      }
    } else {
      sounds.fart.play(null, (err) => {
        console.error(err)
      })
    }

    Animated.timing(this.state.enterAnim, {
      duration: config.timings.gameOverIn, toValue: 1,
    }).start()
  }

  render() { return (
    <GameOverView {...this.props} enterAnim={this.state.enterAnim} />
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

    induct: (score) => {
      dispatch({type: 'scene:change', scene: 'HallOfFame', animation: 'dropIn', props: { induction: true, score: score }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
