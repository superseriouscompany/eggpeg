'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameView from '../components/GameView'
import {
  Dimensions
} from 'react-native'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth:  Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
    }
    this.gameLoop = this.gameLoop.bind(this)
    this.iterate  = this.iterate.bind(this)
    this.shoot    = this.shoot.bind(this)
    this.retry    = this.retry.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'head:setY',
      y: (this.state.windowHeight - this.props.head.width) / 2
    })
    this.gameLoop()
  }

  gameLoop() {
    this.iterate();
    requestAnimationFrame(this.gameLoop)
  }

  iterate() {
    if( this.props.result.done ) { return; }
    // update head position
    const {width, x}    = this.props.head
    const {windowWidth} = this.state
    let {velocity}      = this.props.head
    if( velocity > 0 && (x + width) >= windowWidth ) { velocity *= -1 }
    if( velocity < 0 && x <= 0 ) { velocity *= -1 }
    this.props.dispatch({type: 'head:move', velocity: velocity})

    if( !this.props.bullet.time ) { return; }
    const bulletFiredAgo = +new Date - this.props.bullet.time;
    const isExpired      = bulletFiredAgo >= this.props.bullet.delay + this.props.bullet.linger;
    const isActive       = bulletFiredAgo >= this.props.bullet.delay && !isExpired;

    // update shadow
    if( !isActive && !isExpired ) {
      const shadowTime = (this.props.bullet.delay - bulletFiredAgo) / this.props.bullet.delay;
      this.props.dispatch({type: 'bullet:updateShadow', size: shadowTime})
    }
    // update bullet position
    if( !this.props.bullet.visible && isActive ) {
      this.props.dispatch({type: 'bullet:show'})
    }

    // check for a hit
    if( !this.props.head.hit && isActive && isCollision(this.props.head, this.props.bullet) ) {
      this.props.dispatch({type: 'head:hit'})
      this.props.dispatch({type: 'result:win'})
    }

    // check for expiry
    if( this.props.bullet.visible && isExpired ) {
      this.props.dispatch({type: 'bullet:hide'})
      if( !this.props.head.hit ) {
        this.props.dispatch({type: 'bullet:miss'})
        if( this.props.hasBullets ) {
          alert('Nope.')
        } else {
          this.props.dispatch({type: 'result:loss'})
        }
      }
    }
  }

  shoot(x, y) {
    this.props.dispatch({type: 'bullet:fire', x: x, y: y})
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
    bullet:     state.bullet,
    head:       state.head,
    chamber:    state.chamber,
    hasBullets: state.chamber > 0,
    result:     state.result,
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
