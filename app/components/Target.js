'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import config from '../config'
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
      { target.hit && target.ring === 'bullseye' ?
        <Aura width={target.width} style={[{
          width: this.state.ghostAnim.interpolate({
            inputRange:  [0, 1],
            outputRange: [target.width, target.width * 2],
          }),
          height: this.state.ghostAnim.interpolate({
            inputRange:  [0, 1],
            outputRange: [target.width, target.width * 2],
          }),
          opacity: this.state.ghostAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })
        }]}/>
      : null }

      { target.hit ?
        <Bullseye hit={target.hit} ring={target.ring} width={target.width} height={target.width} rewardStyle={{
          ...style.reward,
          backgroundColor: base.colors.reward,
          opacity: this.state.ghostAnim.interpolate({
            inputRange:  [0, .05, 1],
            outputRange: [0, .5, 0],
          }),
        }}/>
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
          fontSize: Math.round(16 + target.width / 20),
        }]}>{target.score}</Animated.Text>
      : null }
    </View>
  )}
}

function Aura(props) {
  const {width, height} = props;

  return (
    <Animated.View style={[...props.style, style.aura, {
      borderRadius: width,
      borderColor: base.colors.reward,
      borderWidth: Math.round(width / 40),
    }]} />
  )
}

function Bullseye(props) {
  const {width, height, hit, ring} = props;
  const rings = [
    { width: width, height: height },
    { width: width - width / 5, height: height - height / 5 },
    { width: width - 2 * width / 5, height: height - 2 * height / 5 },
    { width: width - 3 * width / 5, height: height - 3 * height / 5 },
    { width: width - 4 * width / 5, height: height - 4 * height / 5 },
  ]

  return (
    <Animated.View style={[hit ? ring == 'outer' ? style.dead : style.dead : style.rim, style.ring, {
      width: rings[0].width,
      height: rings[0].height,
      borderRadius: rings[0].width/2
    }]}>
      <Animated.View style={[hit ? ring == 'inner' ? style.dead : style.dead : style.outer, style.ring, {
        width: rings[1].width,
        height: rings[1].height,
        borderRadius: rings[1].width/2,
      }]}>
        <Animated.View style={[hit ? ring == 'inner' ? style.dead : style.dead : style.middle, style.ring, {
          width: rings[2].width,
          height: rings[2].height,
          borderRadius: rings[2].width/2,
        }]}>
          <Animated.View style={[hit ? ring == 'bullseye' ? props.rewardStyle : style.dead : style.inner, style.ring, {
            width: rings[3].width,
            height: rings[3].height,
            borderRadius: rings[3].width/2,
          }]}>
            <Animated.View style={[hit ? ring == 'bullseye' ? props.rewardStyle : style.dead : style.bullseye, style.ring, {
              width: rings[4].width,
              height: rings[4].height,
              borderRadius: rings[4].width/2,
            }]} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
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
  aura: {
    position: 'absolute',
  },
  rim: {
    position:        'absolute',
    backgroundColor: base.colors.red,
  },
  outer: {
    backgroundColor: 'white'
  },
  middle: {
    backgroundColor: base.colors.red,
  },
  inner: {
    backgroundColor: 'white'
  },
  bullseye: {
    backgroundColor: base.colors.red
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
