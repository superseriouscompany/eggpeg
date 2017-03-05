'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import config from '../config'
import {
  Dimensions
} from 'react-native'

class Game extends Component {
  constructor(props) {
    super(props)
    this.gameLoop = this.gameLoop.bind(this)
    this.iterate  = this.iterate.bind(this)
    this.shoot    = this.shoot.bind(this)
    this.retry    = this.retry.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'targets:add',
      x: 0,
      y: (Dimensions.get('window').height - config.sizes.target) / 2,
      xMax: Dimensions.get('window').width,
      velocity: 1,
    })

    this.props.dispatch({
      type: 'targets:add',
      x: 50,
      y: (Dimensions.get('window').height - config.sizes.target) / 2,
      xMax: Dimensions.get('window').width,
      velocity: 1.2,
    })
    this.gameLoop()
  }

  gameLoop() {
    this.iterate();
    requestAnimationFrame(this.gameLoop)
  }

  iterate() {
    if( this.props.result.done ) { return; }
    this.props.dispatch({type: 'tick'})

    this.props.bullets.filter((bullet) => {
      return bullet.visible
    }).forEach((bullet, bi) => {
      this.props.targets.forEach((target, index) => {
        if( !target.hit && isCollision(target, bullet) ) {
          this.props.dispatch({type: 'targets:hit', index: index})
          console.log('dispatching bullet hit')
          this.props.dispatch({type: 'bullets:hit', index: bi})
        }
      })
    })

    const allHit = !this.props.targets.find((t) => { return !t.hit })
    // check if all hit
    if( this.props.targets.length && allHit ) {
      this.props.dispatch({type: 'result:win'})
    }


    if( !this.props.hasBullets ) {
      const allSpent = !this.props.bullets.find((b) => { return !b.spent })
      if( allSpent ) {
        this.props.dispatch({type: 'result:loss'})
      }
    }
  }

  shoot(x, y) {
    if( !this.props.hasBullets ) { return console.warn('No bullets'); }
    this.props.dispatch({type: 'bullets:fire', x: x, y: y})
  }

  retry() {
    this.props.dispatch({type: 'result:retry'})
  }

  render() { return (
    <GameView shoot={this.shoot} retry={this.retry} {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    bullets:    state.bullets,
    targets:    state.targets,
    chamber:    state.chamber,
    hasBullets: state.chamber > 0,
    result:     state.result,

    head: state.targets[0],
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

export default connect(mapStateToProps)(Game);
