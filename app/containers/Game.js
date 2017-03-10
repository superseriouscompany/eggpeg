'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {loadLevel} from '../actions/levels'
import {recordScore} from '../actions/scores'
import levels from '../levels'

let level = 0

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
          // To get magic number for max distance:
          //
          // Math.sqrt(
          //   (
          //     Math.pow(target.width, 2) + 2 * target.width * bullet.width + Math.pow(bullet.width, 2)
          //   ) / 2
          // )
          const accuracy = distance(target, bullet) / 17;
          const score =
            accuracy < 0.3 ? 5 :
            accuracy < 0.6 ? 2 :
            1;

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
    this.props.dispatch(recordScore(this.props.score.total)).then((isHigh) => {
      if( isHigh ) {
        alert('New high score!')        
      }
    }).catch((err) => {
      console.error(err)
    })

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

function isCollision(t, b) {
  const aLeft   = t.x;
  const aRight  = t.x + t.width;
  const bLeft   = b.x - b.width/2;
  const bRight  = b.x + b.width/2;
  const aTop    = t.y;
  const aBottom = t.y + (t.height || t.width);
  const bTop    = b.y - b.width /2;
  const bBottom = b.y + (b.height || b.width) / 2;

  const isXCollision = aLeft < bLeft && bLeft < aRight || aLeft < bRight && bRight < aRight;
  const isYCollision = aTop < bTop && bTop < aBottom || aTop < bBottom && bBottom < aBottom;

  return isXCollision && isYCollision;
}

function distance(t, b) {
  const a = {
    x: t.x + t.width / 2,
    y: t.y + (t.height || t.width) / 2
  };

  // https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Distance_between_two_points
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export default connect(mapStateToProps)(Game);
