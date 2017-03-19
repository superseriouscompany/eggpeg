'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import {loadScores, recordScore} from '../actions/scores'
import levels from '../levels'
import {loadProducts} from '../actions/purchases'
import {AsyncStorage} from 'react-native'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state             = { startLevel: levelByName(config.startingLevel) }
    this.shoot             = this.shoot.bind(this)
    this.reset             = this.reset.bind(this)
    this.nextLevel         = this.nextLevel.bind(this)
    this.loadLevel         = this.loadLevel.bind(this)
    this.continue          = this.continue.bind(this)
    this.loadIAPsWithRetry = this.loadIAPsWithRetry.bind(this)
  }

  componentDidMount() {
    if( !this.props.level.done && !this.props.beat ) {
      // TODO: move this responsibility somewhere else
      this.reset()
    }

    this.loadIAPsWithRetry()
  }

  loadIAPsWithRetry() {
    this.props.dispatch(loadProducts((err, ok) => {
      if( err ) {
        setTimeout(this.loadIAPsWithRetry, 30000);
      }
    }))
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
      AsyncStorage.setItem('@eggpeg:passedDemo', 'yes')
      // TODO: this is a terrible name and all of this should move to redux
      this.props.setSkipDemo && this.props.setSkipDemo(true)
    }

    this.setState({level: level})
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'score:reset'})
    this.props.dispatch({type: 'victory:reset'})
    let level = this.state.startLevel;
    if( level < 5 && this.props.skipDemo ) {
      level = 5;
    }
    this.loadLevel(level)
    this.props.dispatch(loadScores())
  }

  shoot(x, y) {
    if( this.props.level.done || this.props.level.finishTime ) { return; }
    if( !this.props.hasBullets ) { return console.warn('No bullets'); }
    this.props.dispatch({type: 'bullets:fire', x: x, y: y})
  }

  render() { return (
    <GameView
      shoot={this.shoot}
      reset={this.reset}
      continue={this.continue}
      nextLevel={this.nextLevel}
      currentScore={this.props.score.total}
      {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    bullets:    state.bullets,
    targets:    state.targets,
    chamber:    state.chamber,
    hasBullets: state.chamber > 0,
    level:      state.level,
    score:      state.score,
    beat:       state.victory,
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
