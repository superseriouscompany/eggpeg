'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import levels from '../levels'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state     = {}
    this.gameLoop  = this.gameLoop.bind(this)
    this.iterate   = this.iterate.bind(this)
    this.shoot     = this.shoot.bind(this)
    this.reset     = this.reset.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.loadLevel = this.loadLevel.bind(this)
    this.continue  = this.continue.bind(this)
  }

  componentDidMount() {
    this.gameLoop()
    this.reset()
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
      return this.setState({beat: true})
    }

    this.setState({level: level})
    this.props.dispatch(loadLevel(level))
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
          const score = Math.round(config.score.max - distance(target, bullet) * config.score.penalty);
          this.props.dispatch({type: 'targets:hit', index: index})
          hits.push({score: score})
        }
      })
      if( hits.length ) {
        let score = hits.reduce((a, v) => { return a + v.score}, 0)
        if( hits.length > 1 ) {
          score *= config.multiplier.multihit * (hits.length - 1)
        }
        this.props.dispatch({type: 'bullets:hit', index: bi, score: score})
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
        this.props.dispatch({type: 'level:loss'})
      }
    }
  }

  shoot(x, y) {
    if( this.props.level.done || this.props.level.finishTime ) { return; }
    if( !this.props.hasBullets ) { return console.warn('No bullets'); }
    this.props.dispatch({type: 'bullets:fire', x: x, y: y})
  }

  reset() {
    this.props.dispatch({type: 'score:reset'})
    this.setState({beat: false})
    this.loadLevel(level)
  }

  render() { return (
    <GameView
      shoot={this.shoot}
      reset={this.reset}
      continue={this.continue}
      nextLevel={this.nextLevel}
      beat={this.state.beat} {...this.props} />
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
  }
}

function isCollision(a, b) {
  const aLeft   = a.x;
  const aRight  = a.x + a.width;
  const bLeft   = b.x;
  const bRight  = b.x + b.width;
  const aTop    = a.y;
  const aBottom = a.y + (a.height || a.width);
  const bTop    = b.y;
  const bBottom = b.y + (b.height || b.width);

  const isXCollision = aLeft < bLeft && bLeft < aRight || aLeft < bRight && bRight < aRight;
  const isYCollision = aTop < bTop && bTop < aBottom || aTop < bBottom && bBottom < aBottom;

  console.log('checked collision', isXCollision, isYCollision, a, b);

  return isXCollision && isYCollision;
}

function distance(a, b) {
  const aCenter = {
    x: a.x + a.width / 2,
    y: a.y + (a.height || a.width) / 2
  };

  const bCenter = {
    x: b.x + b.width / 2,
    y: b.y + (b.height || b.width) / 2
  }

  // https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Distance_between_two_points
  return Math.sqrt(Math.pow(aCenter.x - bCenter.x, 2) + Math.pow(aCenter.y - bCenter.y, 2))
}

export default connect(mapStateToProps)(Game);
