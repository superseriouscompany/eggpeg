'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import config from '../config';
import base from '../styles/base';
import {
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

  render() {
    const {bullet} = this.props;
    const containerWidth = Math.max(config.sizes.shadow, config.sizes.bullet)
    let shadowWidth = Math.round(config.poop * bullet.distanceMultiplier);
    if( isNaN(shadowWidth) ) { shadowWidth = config.poop; }
  return (
    <View style={[style.bulletContainer, bullet.hit ? style.hit : null, {
      left:   bullet.x - containerWidth / 2,
      top:    bullet.y - containerWidth / 2,
      width:  containerWidth,
      height: containerWidth,
    }]}>
      { bullet.hit || bullet.visible ?
        <View style={[style.bullet, bullet.hit ? style.hit : null, {
          width:  bullet.width,
          height: bullet.width,
          borderRadius: bullet.width / 2,
        }]} />
      : bullet.visible ?
        <View style={[style.bullet, {
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
      : bullet.spent ?
        <View style={[style.casing, {
          width:  bullet.width,
          height: bullet.width,
          borderRadius: bullet.width / 2,
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
    borderColor: base.colors.purple,
    borderWidth: 1,
  },
  bullet: {
    backgroundColor: base.colors.yellow,
  },
  hit: {
    zIndex: -1,
  },
  casing: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
})
