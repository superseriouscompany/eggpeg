'use strict';

import React, {Component} from 'react';
import { connect }        from 'react-redux';
import WorldView          from '../views/WorldView'
import config             from '../config'
import {loadLevel}        from '../actions/levels'
import {AsyncStorage}     from 'react-native'
import {
  Animated,
  Easing,
  Dimensions,
} from 'react-native'

const {width} = Dimensions.get('window')

class World extends Component {
  constructor(props) {
    super(props)
    this.reset     = this.reset.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.loadLevel = this.loadLevel.bind(this)
    this.endLevel  = this.endLevel.bind(this)
    this.continue  = this.continue.bind(this)
    this.victory   = this.victory.bind(this)
    this.state     = { progress: false }
  }

  componentWillReceiveProps(props) {
    if( props.level.done && props.level.win && !props.beat ) {
      this.nextLevel()
    }
  }

  componentDidMount() {
    if( this.props.scene.previous ) {
      this.reset()
    }
  }

  continue() {
    this.loadLevel(this.props.level)
  }

  nextLevel() {
    for( var i = 0; i < this.props.levels.length; i++ ) {
      if( this.props.levels[i].name == this.props.level.name ) {
        if( i == this.props.levels.length - 1 ) {
          this.endLevel()
          setTimeout(this.victory, config.timings.worldBeatDelay)
        } else {
          return this.loadLevel(this.props.levels[i+1])
        }
      }
    }
  }

  endLevel() {
    this.setState({
      progress: 1,
    })
  }

  victory() {
    const score = this.props.score;
    if( this.props.world.name !== 'Demo' ) {
      this.props.dispatch({type: 'worlds:beat', score: score})
    }
    this.props.dispatch({type: 'worlds:unlock'})
    if( this.props.world.name == '3' ) {
      return this.props.dispatch({type: 'victory:yes'})
    } else {
      if( this.props.world.name == 'Demo' ) {
        this.props.dispatch({type: 'tutorial:complete'})
      }

      return this.props.dispatch({type: 'scene:change', scene: 'Worlds'})
    }
  }

  loadLevel(level) {
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'game:reset'})
    this.props.dispatch({type: 'session:goal', goal: this.props.world.score, })
    const index = startingLevelIndex(this.props.levels)
    this.props.dispatch(loadLevel(this.props.levels[index]))
  }

  render() { return (
    <WorldView
      {...this.props}
      progress={this.state.progress || this.props.progress}
      reset={this.reset}
      continue={this.continue}
      worldDone={this.state.progress == 1}
       />
  )}
}

function startingLevelIndex(levels) {
  if( !config.startingLevel ) return 0;
  for( var i = 0; i < levels.length; i++ ) {
    if( levels[i].name.toLowerCase() === config.startingLevel.toLowerCase() ) {
      return i
    }
  }

  console.warn(`Couldn't find level ${config.startingLevel}`)
  return 0
}

function mapStateToProps(state) {
  return {
    levels:       state.worlds.current.levels,
    world:        state.worlds.current,
    level:        state.level,
    score:        state.session.score,
    beat:         state.victory,
    scene:        state.scene,
    progress:     state.level.index / state.worlds.current.levels.length,
    hint:         state.level.hint,
  }
}

export default connect(mapStateToProps)(World);
