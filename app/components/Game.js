'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class Game extends Component {
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
      bullet: {
        width:  5,
        delay:  3000,
        linger: 100,
      }
    }
    this.updateGameState = this.updateGameState.bind(this)
    this.shoot = this.shoot.bind(this)
  }

  componentDidMount() {
    this.updateGameState();
  }

  updateGameState() {
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

    // update bullet position
    if( this.state.bullet.time ) {
      const bulletFired = +new Date - this.state.bullet.time;
      if( bulletFired > this.state.bullet.delay + this.state.bullet.linger ) {
        return alert('Nope.')
      } else if( this.state.bullet.visible ) {
        const left      = this.state.head.x;
        const right     = this.state.head.x + this.state.head.width;
        const bullLeft  = this.state.bullet.x;
        const bullRight = this.state.bullet.x + this.state.bullet.width;
        const hit       = left < bullLeft && bullLeft < right || left < bullRight && bullRight < right;

        if( hit ) {
          return alert('You win.')
        }
      } else if( bulletFired >= this.state.bullet.delay ) {
        state.bullet = {
          ...this.state.bullet,
          visible: true,
        }
      } else {
        state.bullet = {
          ...this.state.bullet,
          visible: false,
        }
      }
    }

    this.setState(state);

    setTimeout(this.updateGameState, 10)
  }

  render() {
    const bulletFired = +new Date - this.state.bullet.time;
    return (
      <TouchableWithoutFeedback onPress={this.shoot}>
        <View style={style.container} onPress={this.shoot}>
          <StatusBar hidden={true} />
          <View style={[style.head, {left: this.state.head.x, width: this.state.head.width, height: this.state.head.width}]} />
          { this.state.bullet.visible ?
            <View style={[style.bullet, {left: this.state.bullet.x, width: this.state.bullet.width, height: this.state.bullet.width}]} />
          : null }
        </View>
      </TouchableWithoutFeedback>
    )
  }

  shoot(event) {
    const {nativeEvent} = event

    console.warn(nativeEvent.pageX, nativeEvent.pageY, nativeEvent.locationX, nativeEvent.locationY)
    this.setState({
      bullet: {
        ...this.state.bullet,
        time: +new Date,
        x: nativeEvent.pageX,
      }
    })
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
