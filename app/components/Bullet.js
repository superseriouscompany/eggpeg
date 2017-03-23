'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import config             from '../config';
import base               from '../styles/base';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

export default class Bullet extends Component {
  static propTypes = {
    bullet: PropTypes.shape({
      x:       PropTypes.number.isRequired,
      y:       PropTypes.number.isRequired,
      width:   PropTypes.number.isRequired,
      shadow:  PropTypes.number,
      visible: PropTypes.bool,
      spent:   PropTypes.bool,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      multAnim: new Animated.Value(0),
      incAnim: new Animated.Value(0),
      score: 0,
    }
    this.displayScore = this.displayScore.bind(this)
    this.state.incAnim.addListener(this.displayScore)
  }

  componentWillUnmount() {
    this.state.incAnim.removeListener(this.displayScore)
  }

  componentWillReceiveProps(props) {
    if( props.hit && !this.props.hit && props.bullet.count > 1 ) {
      const startDelay   = config.timings.multiplierDelay;
      const betweenDelay = config.timings.multiplierBetween;
      Animated.stagger(betweenDelay, [
        Animated.timing(
          this.state.multAnim,
          { toValue: 1, duration: 1750, delay: startDelay, },
        ),
        Animated.timing(
          this.state.incAnim,
          { toValue: 1, duration: 1750, delay: startDelay,  }
        )
      ], { delay: 1000 }).start()
    }
  }

  displayScore(animation) {
    this.setState({
      score: Math.min(this.props.bullet.score, Math.round(this.props.bullet.score * animation.value * 2))
    })
  }

  render() {
    const {bullet} = this.props;
    const containerWidth = Math.max(config.sizes.shadow, config.sizes.bullet)
    let shadowWidth = Math.round(config.sizes.shadow * bullet.shadow);
  return (
    <View style={[style.bulletContainer, bullet.hit ? style.bg : bullet.spent ? style.bgspent : null, {
      left:   bullet.x - containerWidth / 2,
      top:    bullet.y - containerWidth / 2,
      width:  containerWidth,
      height: containerWidth,
    }]}>
      { bullet.hit && bullet.count > 1 ?
        <Animated.Text style={[style.ghost, {
          top: this.state.multAnim.interpolate({
            inputRange:  [0, 1],
            outputRange: [5, -config.sizes.bullet - 30],
          }),
          opacity: this.state.multAnim.interpolate({
            inputRange:  [0, 0.1, 0.5, 1],
            outputRange: [0, 1, 1, 0],
          }),
          fontSize: Math.round(18 + config.sizes.target / 10),
        }]}>x{bullet.count}</Animated.Text>
      : null }
      { bullet.hit ?
        <Animated.Text style={[style.ghost, {
          top: this.state.incAnim.interpolate({
            inputRange:  [0, 1],
            outputRange: [5, -config.sizes.bullet - 30],
          }),
          opacity: this.state.incAnim.interpolate({
            inputRange:  [0, 0.1, 0.5, 1],
            outputRange: [0, 1, 1, 0],
          }),
          fontSize: Math.round(18 + config.sizes.target / 10)
        }]}>{this.state.score}</Animated.Text>
      : null }

      { bullet.hit || bullet.visible ?
        <View style={[style.bullet, bullet.hit ? style.bg : null, {
          width:  bullet.width,
          height: bullet.width,
          borderRadius: bullet.width / 2,
        }]} />
      : bullet.spent ?
        <View style={[style.casing, {
          width:  bullet.width,
          height: bullet.width,
          borderRadius: bullet.width / 2,
        }]} />
      : bullet.shadow > 0 ?
        <View style={[style.shadow, {
          width:  shadowWidth,
          height: shadowWidth,
          borderRadius: shadowWidth / 2,
        }]} />
      : null
      }
    </View>
  )}
}

const style = StyleSheet.create({
  bulletContainer: {
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
  },
  shadow: {
    backgroundColor: 'white',
    borderColor:     base.colors.purple,
    borderWidth:     1,
    zIndex:          1,
  },
  bullet: {
    backgroundColor: base.colors.yellow,
  },
  ghost: {
    position:        'absolute',
    color:           'white',
    backgroundColor: 'transparent',
  },
  bg: {
    zIndex: -1,
  },
  bgspent: {
    zIndex: -2,
  },
  casing: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
})
