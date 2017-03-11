'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Animated,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class Target extends Component {
  static propTypes = {
    target: PropTypes.shape({
      x:     PropTypes.number.isRequired,
      y:     PropTypes.number,
      width: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      ghostAnim: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(props) {
    if( props.hit && !this.props.hit ) {
      Animated.timing(
        this.state.ghostAnim,
        { toValue: 1, duration: 1750 },
      ).start()
    }
  }

  render() {
    const {target} = this.props;
  return (
    <View style={[style.targetContainer, target.hit ? style.hitContainer : null, {
      left:   target.x,
      top:    target.y,
      width:  target.width,
      height: target.width,
    }]}>
      { target.hit ?
        <View style={[style.dead,{
          width:  target.width,
          height: target.width,
          borderRadius: target.width/2,
        }]} />
      :
        <Image source={require('../images/Target.png')} style={[style.target, {
          width: target.width,
          height: target.width}]} />
      }
      { target.hit ?
        <Animated.Text style={[style.score, {
          top: this.state.ghostAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -target.width - 30],
          }),
          opacity: this.state.ghostAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 0],
          }),
        }]}>{target.score}</Animated.Text>
      : null }
    </View>
  )}
}

const style = StyleSheet.create({
  targetContainer: {
    position:       'absolute',
    alignItems:     'center',
    justifyContent: 'center',
  },
  target: {
    position: 'absolute',
    zIndex: 1,
  },
  dead: {
    position: 'absolute',
    backgroundColor: '#532D5A',
    zIndex: -1,
  },
  hitContainer: {
    zIndex: -1,
  },
  score: {
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
})
