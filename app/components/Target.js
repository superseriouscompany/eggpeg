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
        { toValue: 1, duration: 1000 },
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
      <Image source={require('../images/Target.png')} style={[style.target, target.hit ? style.hitTarget : null, {
        width: target.width,
        height: target.width}]} />
      { target.hit ?
        <Animated.Text style={[style.score, {
          top: this.state.ghostAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-target.width, -target.width - 30]
          }),
          opacity: this.state.ghostAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
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
  hitContainer: {
    zIndex: -1,
  },
  hitTarget: {
    backgroundColor: '#532D5A',
  },
  score: {
    color: 'hotpink',
    position: 'absolute',
    textAlign: 'center',
    zIndex: -1,
  },
})
