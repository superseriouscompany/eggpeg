'use strict';

import React, {Component}          from 'react';
import { connect }                 from 'react-redux';
import GameView                    from '../components/GameView'
import config                      from '../config'
import {loadLevel, loadFirstLevel} from '../actions/levels'
import {loadScores, recordScore}   from '../actions/scores'
import {AsyncStorage}              from 'react-native'
import {changeMode}                from '../actions/difficulty'

class Game extends Component {
  constructor(props) {
    super(props)
    this.reset     = this.reset.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.loadLevel = this.loadLevel.bind(this)
    this.continue  = this.continue.bind(this)
  }

  componentWillReceiveProps(props) {
    if( props.level.done && props.level.win ) {
      this.nextLevel()
    }
  }

  componentDidMount() {
    this.props.dispatch(loadScores())
  }

  continue() {
    this.loadLevel(this.props.level)
  }

  nextLevel() {
    for( var i = 0; i < this.props.levels.length; i++ ) {
      if( this.props.levels[i].name == this.props.level.name ) {
        return this.loadLevel(this.props.levels[i+1])
      }
    }
  }

  loadLevel(level) {
    debugger
    if( level >= this.props.levels.length ) {
      const score = this.props.score.total;
      this.props.dispatch(recordScore(score)).catch((err) => {
        console.error(err)
      })
      this.props.dispatch({type: 'worlds:beat', score: score})
      this.props.dispatch({type: 'worlds:unlock'})
      if( this.props.world.name == '3' ) {
        // TODO: delete difficulty reducer and actions
        this.props.dispatch({type: 'difficulty:unlock'})
        return this.props.dispatch({type: 'victory:yes'})
      } else {
        if( this.props.world.name == 'Demo' ) {
          this.props.dispatch({type: 'tutorial:complete'})
        }

        return this.props.dispatch({type: 'scene:change', scene: 'Worlds'})
      }
    }
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'game:reset'})
    this.props.dispatch(loadLevel(this.props.levels[0]))
  }

  render() { return (
    <GameView
      reset={this.reset}
      continue={this.continue}
      currentScore={this.props.score.total}
      {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    chamber:      state.chamber,
    levels:       state.worlds.current.levels,
    world:        state.worlds.current,
    level:        state.level,
    score:        state.score,
    beat:         state.victory,
    showTutorial: !state.tutorial.complete,
    difficulty:   state.difficulty,
  }
}

export default connect(mapStateToProps)(Game);
