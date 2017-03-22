'use strict';

import React, {Component}          from 'react';
import { connect }                 from 'react-redux';
import GameView                    from '../components/GameView'
import config                      from '../config'
import {loadLevel, loadFirstLevel} from '../actions/levels'
import {loadScores, recordScore}   from '../actions/scores'
import levels                      from '../levels'
import {AsyncStorage}              from 'react-native'
import {changeMode}                from '../actions/difficulty'

class Game extends Component {
  constructor(props) {
    super(props)
    this.reset             = this.reset.bind(this)
    this.nextLevel         = this.nextLevel.bind(this)
    this.loadLevel         = this.loadLevel.bind(this)
    this.continue          = this.continue.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(loadScores())
  }

  continue() {
    // TODO: make sure this doesn't happen on upgrade
    this.loadLevel(this.props.level.index)
  }

  nextLevel() {
    // TODO: make sure this doesn't happen on upgrade
    if( !this.props.level.index ) { console.warn('No level index found'); this.loadLevel(0); }
    this.loadLevel(this.props.level.index + 1)
  }

  loadLevel(level) {
    if( level >= levels.length ) {
      this.props.dispatch(recordScore(this.props.score.total)).catch((err) => {
        console.error(err)
      })
      this.props.dispatch({type: 'difficulty:unlock'})
      return this.props.dispatch({type: 'victory:yes'})
    }
    if( level >= 5 ) {
      this.props.dispatch({type: 'tutorial:complete'})
    }

    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'game:reset'})
    this.props.dispatch(loadFirstLevel(this.props.showTutorial))
  }

  render() { return (
    <GameView
      reset={this.reset}
      continue={this.continue}
      nextLevel={this.nextLevel}
      currentScore={this.props.score.total}
      {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    chamber:      state.chamber,
    level:        state.level,
    score:        state.score,
    beat:         state.victory,
    showTutorial: !state.tutorial.complete,
    difficulty:   state.difficulty,
  }
}

export default connect(mapStateToProps)(Game);
