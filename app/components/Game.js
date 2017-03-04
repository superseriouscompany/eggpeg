'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Component from './Component';
import Text from './Text';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: {
        width: Dimensions.get('window').width,
      },
      head: {
        x:        0,
        velocity: 1,
        width:    20,
      },
    }
    this.gameLoop = this.gameLoop.bind(this)
    this.shoot = this.shoot.bind(this)
  }

  componentDidMount() {
    this.gameLoop();
  }

  gameLoop() {
    // update head position
    const {width, x} = this.state.head
    const windowWidth = this.state.window.width
    let {velocity} = this.state.head
    if( velocity > 0 && (x + width) >= windowWidth ) { velocity *= -1 }
    if( velocity < 0 && x <= 0 ) { velocity *= -1 }
    let state = {
      head: {
        ...this.state.head,
        x: x + velocity,
        velocity: velocity,
      }
    }

    this.setState(state);

    // update bullet position
    if( this.props.bullet.time ) {
      const bulletFired = +new Date - this.props.bullet.time;
      if( bulletFired > this.props.bullet.delay + this.props.bullet.linger ) {
        return alert('Nope.')
      } else if( this.props.bullet.visible ) {
        const left      = this.state.head.x;
        const right     = this.state.head.x + this.state.head.width;
        const bullLeft  = this.props.bullet.x;
        const bullRight = this.props.bullet.x + this.props.bullet.width;
        const hit       = left < bullLeft && bullLeft < right || left < bullRight && bullRight < right;

        if( hit ) {
          return alert('You win.')
        }
      } else if( bulletFired >= this.props.bullet.delay ) {
        this.props.dispatch({type: 'bullet:show'})
      } else if( this.props.bullet.visible ){
        this.props.dispatch({type: 'bullet:hide'})
      }
    }

    setTimeout(this.gameLoop, 10)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.shoot}>
        <View style={style.container} onPress={this.shoot}>
          <StatusBar hidden={true} />
          <View style={[style.head, {left: this.state.head.x, width: this.state.head.width, height: this.state.head.width}]} />
          { this.props.bullet.visible ?
            <View style={[style.bullet, {left: this.props.bullet.x, width: this.props.bullet.width, height: this.props.bullet.width}]} />
          : null }
        </View>
      </TouchableWithoutFeedback>
    )
  }

  shoot(event) {
    this.props.dispatch({type: 'bullet:fire', x: event.nativeEvent.pageX})
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  head: {
    backgroundColor: 'slateblue',
    position: 'absolute',
  },
  bullet: {
    backgroundColor: 'orange',
  },
})

function mapStateToProps(state) {
  return {
    bullet: state.bullet,
  }
}

export default connect(mapStateToProps)(Game)
