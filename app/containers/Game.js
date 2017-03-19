'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import {loadScores, recordScore} from '../actions/scores'
import levels from '../levels'
import {AsyncStorage} from 'react-native'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state             = { startLevel: levelByName(config.startingLevel) }
    this.reset             = this.reset.bind(this)
    this.nextLevel         = this.nextLevel.bind(this)
    this.loadLevel         = this.loadLevel.bind(this)
    this.continue          = this.continue.bind(this)
  }

  componentDidMount() {
    if( !this.props.level.done && !this.props.beat ) {
      // TODO: move this responsibility somewhere else
      this.reset()
    }
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

    this.setState({level: level})
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'score:reset'})
    this.props.dispatch({type: 'victory:reset'})
    let level = this.state.startLevel;
    if( level < 5 && this.props.skipTutorial ) {
      level = 5;
    }
    this.loadLevel(level)
    this.props.dispatch(loadScores())
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
    skipTutorial: state.tutorial.complete,
  }
}

function levelByName(name) {
  let level;
  for( var i = 0; i < levels.length; i++ ) {
    if( levels[i].name.toLowerCase() !== name.toLowerCase() ) { continue; }
    return i;
  }
  throw `Level not found: ${name}`
}

export default connect(mapStateToProps)(Game);
