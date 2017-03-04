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
      windowWidth: Dimensions.get('window').width,
    }
    this.gameLoop = this.gameLoop.bind(this)
    this.iterate  = this.iterate.bind(this)
    this.shoot    = this.shoot.bind(this)
  }

  componentDidMount() {
    this.gameLoop()
  }

  gameLoop() {
    this.iterate();
    setTimeout(this.gameLoop, 10)
  }

  iterate() {
    // update head position
    const {width, x}    = this.props.head
    const {windowWidth} = this.state
    let {velocity}      = this.props.head
    if( velocity > 0 && (x + width) >= windowWidth ) { velocity *= -1 }
    if( velocity < 0 && x <= 0 ) { velocity *= -1 }
    this.props.dispatch({type: 'head:move', velocity: velocity})

    if( !this.props.bullet.time ) { return; }
    const bulletFired = +new Date - this.props.bullet.time;
    const isExpired   = bulletFired >= this.props.bullet.delay + this.props.bullet.linger;
    const isActive    = bulletFired >= this.props.bullet.delay && !isExpired;

    // update bullet position
    if( !this.props.bullet.visible && isActive ) {
      this.props.dispatch({type: 'bullet:show'})
    }

    // check for a hit
    if( !this.props.head.hit && isActive && isCollision(this.props.head, this.props.bullet) ) {
      this.props.dispatch({type: 'head:hit'})
      alert('You win.')
    }

    // check for expiry
    if( this.props.bullet.visible && isExpired ) {
      this.props.dispatch({type: 'bullet:hide'})
      if( !this.props.head.hit ) {
        alert('You lose.')
      }
    }
  }

  shoot(x) {
    this.props.dispatch({type: 'bullet:fire', x: x})
  }

  render() { return (
    <GameView shoot={this.shoot} {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    bullet: state.bullet,
    head:   state.head,
  }
}

function isCollision(a, b) {
  const aLeft  = a.x;
  const aRight = a.x + a.width;
  const bLeft  = b.x;
  const bRight = b.x + b.width;
  return aLeft < bLeft && bLeft < aRight || aLeft < bRight && bRight < aRight;
}

export default connect(mapStateToProps)(Game);
