'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
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
    <View style={[style.bulletContainer, {
      left:   bullet.x - bullet.width,
      top:    bullet.y - bullet.width,
      width:  bullet.width * 2,
      height: bullet.width * 2,
    }]}>
      { bullet.visible ?
        <View style={[style.bullet, {
          width:  bullet.width,
          height: bullet.width}]} />
      : bullet.shadow > 0 ?
        <View style={[style.shadow, {
          width:  bullet.width * 2 * bullet.shadow,
          height: bullet.width * 2 * bullet.shadow}]} />
      : bullet.spent ?
        <View style={[style.casing, {
          width:  bullet.width,
          height: bullet.width,
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
    backgroundColor: 'turquoise',
  },
  bullet: {
    backgroundColor: 'orange',
  },
  casing: {
    position: 'absolute',
    borderColor: 'indianred',
    borderWidth: 1,
  },
})
