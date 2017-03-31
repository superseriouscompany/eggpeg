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
      timer: config.countdown,
      enterAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    const {scores} = this.props.leaderboard;
    const {score, worldScore}  = this.props;

    if( score > worldScore ) {
      sounds.woohoo.play(null, (err) => {
        console.error(err)
      })

      // TODO: move this out of here
      for( var i = 0; i < scores.length; i++ ) {
        if( scores[i].score < score ) {
          this.props.dispatch({type: 'scene:change', scene: 'HallOfFame'})
          return;
        }
      }
    } else {
      sounds.fart.play(null, (err) => {
        console.error(err)
      })
    }
  }

  render() { return (
    <GameOverView {...this.props} enterAnim={this.state.enterAnim} />
  )}
}

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
    worldScore:  state.worlds.current.score,
    score:       score,
    highScore:   state.score.highScores && state.score.highScores[0],
    leaderboard: leaderboard,
    carrot:      carrot,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitHOF: () => {
      dispatch({type: 'scene:change', scene: 'HallOfFame'})
    },

    visitWorlds: () => {
      dispatch({type: 'scene:change', scene: 'Worlds'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
