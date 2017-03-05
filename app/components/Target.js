'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
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

  render() {
    const {target} = this.props;
  return (
    <View style={[style.target, target.hit ? style.hit : null, {
      left:   target.x,
      top:    target.y,
      width:  target.width,
      height: target.width
    }]} />
  )}
}

const style = StyleSheet.create({
  target: {
    position: 'absolute',
    backgroundColor: base.colors.beige,
    borderRadius: 2,
  },
  hit: {
    backgroundColor: '#532D5A',
    zIndex: -1,
  },
})
