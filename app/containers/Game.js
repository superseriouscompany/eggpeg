'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import {recordScore} from '../actions/scores'
import levels from '../levels'
import {loadProducts} from '../actions/purchases'

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
    this.loadLevel(this.state.level + 1)
  }

  loadLevel(level) {
    if( level >= levels.length ) {
      this.props.dispatch(recordScore(this.props.score.total)).catch((err) => {
        console.error(err)
      })
      return this.props.dispatch({type: 'victory:yes'})
    }

    this.setState({level: level})
    this.props.dispatch(loadLevel(level))
  }

  reset() {
    this.props.dispatch({type: 'score:reset'})
    this.props.dispatch({type: 'victory:reset'})
    this.loadLevel(this.state.startLevel)
    if( this.state.startLevel === 0 ) {
      this.setState({
        startLevel: 1
      })
    }
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

          this.props.dispatch({type: 'targets:hit', index: index, score: score})
          hits.push({score: score})
        }
      })
      if( hits.length ) {
        let score = hits.reduce((a, v) => { return a + v.score}, 0)
        if( hits.length > 1 ) {
          score *= config.multiplier.multihit * (hits.length - 1)
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

function isCollision(t, b) {
  const aLeft   = t.x - t.width/2;
  const aRight  = t.x + t.width/2;
  const bLeft   = b.x - b.width/2;
  const bRight  = b.x + b.width/2;
  const aTop    = t.y - t.width/2;
  const aBottom = t.y + (t.height || t.width)/2;
  const bTop    = b.y - b.width/2;
  const bBottom = b.y + (b.height || b.width)/2;

  const isXCollision = aLeft < bLeft && bLeft < aRight || aLeft < bRight && bRight < aRight;
  const isYCollision = aTop < bTop && bTop < aBottom || aTop < bBottom && bBottom < aBottom;

  return isXCollision && isYCollision;
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
