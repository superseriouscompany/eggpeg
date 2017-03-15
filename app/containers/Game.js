'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import {recordScore} from '../actions/scores'
import levels from '../levels'
import {loadProducts} from '../actions/purchases'
import {AsyncStorage} from 'react-native'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state             = { startLevel: levelByName(config.startingLevel) }
    this.gameLoop          = this.gameLoop.bind(this)
    this.iterate           = this.iterate.bind(this)
    this.shoot             = this.shoot.bind(this)
    this.reset             = this.reset.bind(this)
    this.nextLevel         = this.nextLevel.bind(this)
    this.loadLevel         = this.loadLevel.bind(this)
    this.continue          = this.continue.bind(this)
    this.loadIAPsWithRetry = this.loadIAPsWithRetry.bind(this)
  }

  componentDidMount() {
    this.gameLoop()
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

  gameLoop() {
    this.iterate();
    requestAnimationFrame(this.gameLoop)
  }

  continue() {
    this.loadLevel(this.state.level)
  }

  nextLevel() {
    if( config.debugBullseye ) { return this.loadLevel(this.state.level)}
    this.loadLevel(this.state.level + 1)
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
    }

    this.setState({level: level})
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'score:reset'})
    this.props.dispatch({type: 'victory:reset'})
    let level = this.state.startLevel;
    if( level === 0 && this.props.skipDemo ) {
      level = 5;
    }
    this.loadLevel(level)
  }

  iterate() {
    if( this.props.level.done ) { return; }
    if( this.props.level.finishTime ) {
      if( +new Date <= this.props.level.finishTime ) { return; }
      return this.props.dispatch({type: 'level:finish'})
    }
    this.props.dispatch({type: 'tick'})

    this.props.bullets.forEach((bullet, bi) => {
      let hits = []
      this.props.targets.forEach((target, index) => {
        if( bullet.visible && !target.hit && isCollision(target, bullet) ) {
          const magicNumber = Math.sqrt(
            (
              Math.pow(target.width, 2) + 2 * target.width * bullet.width + Math.pow(bullet.width, 2)
            ) / 2
          )
          const accuracy = distance(target, bullet) / magicNumber;
          const score =
            accuracy < 0.3 ? 5 :
            accuracy < 0.6 ? 2 :
            1;
          const ring =
            accuracy < 0.3 ? 'bullseye' :
            accuracy < 0.6 ? 'inner' :
            'outer';

          score *= config.scoreBonus
          this.props.dispatch({type: 'targets:hit', index, score, ring})
          hits.push({score: score})
        }
      })
      if( hits.length ) {
        let score = hits.reduce((a, v) => { return a + v.score}, 0)
        if( hits.length > 1 ) {
          score *= hits.length
        }
        this.props.dispatch({type: 'bullets:hit', index: bi, score: score, count: hits.length})
      }
    })

    const allHit = !this.props.targets.find((t) => { return !t.hit })
    // check if all hit
    if( this.props.targets.length && allHit ) {
      this.props.dispatch({type: 'level:win'})
    }


    if( !this.props.hasBullets ) {
      const allSpent = !this.props.bullets.find((b) => { return !b.spent })
      if( allSpent ) {
        this.props.dispatch(recordScore(this.props.score.total)).catch((err) => {
          console.error(err)
        })
        this.props.dispatch({type: 'level:loss'})
      }
    }
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
      currentLevel={this.state.level}
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

// http://stackoverflow.com/questions/8367512/algorithm-to-detect-if-a-circles-intersect-with-any-other-circle-in-the-same-pla
function isCollision(t, b) {
  const r0 = t.width/2;
  const r1 = b.width/2;

  const maxDistance = Math.pow(t.x - b.x, 2) + Math.pow(t.y - b.y, 2);

  return Math.pow(r0-r1, 2) <= maxDistance && maxDistance <= Math.pow(r0+r1, 2);
}

function distance(t, b) {
  // https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Distance_between_two_points
  return Math.sqrt(Math.pow(t.x - b.x, 2) + Math.pow(t.y - b.y, 2))
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
