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
            marginLeft: this.props.head.x,
            width: this.props.head.width,
            height: this.props.head.width
          }]} />
          <View style={[style.bulletContainer, {
            left:   this.props.bullet.x - this.props.bullet.width,
            top:    this.props.bullet.y - this.props.bullet.width,
            width:  this.props.bullet.width * 2,
            height: this.props.bullet.width * 2,
          }]}>
            { this.props.bullet.visible ?
              <View style={[style.bullet, {
                width:  this.props.bullet.width,
                height: this.props.bullet.width}]} />
            : this.props.bullet.shadow > 0 ?
              <View style={[style.shadow, {
                width:  this.props.bullet.width * 2 * this.props.bullet.shadow,
                height: this.props.bullet.width * 2 * this.props.bullet.shadow}]} />

            : null
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  shoot(event) {
    this.props.shoot(event.nativeEvent.pageX, event.nativeEvent.pageY)
  }
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
  },
  head: {
    backgroundColor: 'slateblue',
    position:        'absolute',
  },
  bullet: {
    backgroundColor: 'orange',
  },
  bulletContainer: {
    borderColor:    'red',
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
  },
  shadow: {
    backgroundColor: 'turquoise',
  },
})
