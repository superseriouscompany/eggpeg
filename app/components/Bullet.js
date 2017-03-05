'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import config from '../config';
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
  return (
    <View style={[style.bulletContainer, bullet.hit ? style.hit : null, {
      left:   bullet.x - bullet.width,
      top:    bullet.y - bullet.width,
      width:  Math.max(config.sizes.shadow, config.sizes.bullet),
      height: Math.max(config.sizes.shadow, config.sizes.bullet),
    }]}>
      { bullet.visible || bullet.hit ?
        <View style={[style.bullet, bullet.hit ? style.hit : null, {
          width:  bullet.width,
          height: bullet.width,
          borderRadius: bullet.width / 2,
        }]} />
      : bullet.shadow > 0 ?
        <View style={[style.shadow, {
          width:  config.sizes.shadow * bullet.shadow,
          height: config.sizes.shadow * bullet.shadow,
          borderRadius: (config.sizes.shadow * bullet.shadow) / 2,
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
    borderColor: 'black',
    borderWidth: 1,
  },
  bullet: {
    backgroundColor: '#F5B140',
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
