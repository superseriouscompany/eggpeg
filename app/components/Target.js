'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Animated,
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
      left:   target.x - target.width / 2,
      top:    target.y - target.width / 2,
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
        <Bullseye width={target.width} height={target.width}/>
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

function Bullseye(props) {
  const {width, height} = props;
  const rings = [
    { width: width, height: height },
    { width: width - width / 4, height: height - height / 4 },
    { width: width - width / 2, height: height - height / 2 },
    { width: width - 3 * width / 4, height: height - 3 * height / 4 },
  ]

  return (
    <View style={[style.rim, style.ring, {
      width: rings[0].width,
      height: rings[0].height,
      borderRadius: rings[0].width/2
    }]}>
      <View style={[style.outer, style.ring, {
        width: rings[1].width,
        height: rings[1].height,
        borderRadius: rings[1].width/2,
      }]}>
        <View style={[style.inner, style.ring, {
          width: rings[2].width,
          height: rings[2].height,
          borderRadius: rings[2].width/2,
        }]}>
          <View style={[style.bullseye, style.ring, {
            width: rings[3].width,
            height: rings[3].height,
            borderRadius: rings[3].width/2,
          }]} />
        </View>
      </View>
    </View>
  )
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
  ring: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  rim: {
    position:        'absolute',
    backgroundColor: 'white',
  },
  outer: {
    backgroundColor: 'cornflowerblue',
  },
  inner: {
    backgroundColor: 'indianred',
  },
  bullseye: {
    backgroundColor: 'gold'
  },
  dead: {
    position: 'absolute',
    backgroundColor: '#532D5A',
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
