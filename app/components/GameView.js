'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class GameView extends Component {
  static propTypes = {
    shoot: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.shoot = this.shoot.bind(this)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.shoot}>
        <View style={style.container}>
          <StatusBar hidden={true} />
          <View style={[style.head, {
            left: this.props.head.x,
            width: this.props.head.width,
            height: this.props.head.width
          }]} />
          { this.props.bullet.visible ?
            <View style={[style.bullet, {
              left: this.props.bullet.x,
              width: this.props.bullet.width,
              height: this.props.bullet.width}]} />
          : this.props.bullet.shadow ?
            <View style={[style.shadow, {
              left: this.props.bullet.x,
              width: this.props.bullet.width,
              height: this.props.bullet.width}]} />

          : null
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }

  shoot(event) {
    this.props.shoot(event.nativeEvent.pageX)
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
  shadow: {
    backgroundColor: 'turquoise',
  },
})
