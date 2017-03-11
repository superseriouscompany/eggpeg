'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
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

  render() {
    const {target} = this.props;
  return (
    <View style={[style.targetContainer, {
      left:   target.x,
      top:    target.y,
      width:  target.width,
      height: target.width,
    }]}>
      <Image source={require('../images/Target.png')} style={[style.target, target.hit ? style.hit : null, {
        width: target.width,
        height: target.width}]} />
      { target.hit ?
        <Text style={[style.score, {
          top: -target.width - 5,
        }]}>{target.score}</Text>
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
  hit: {
    backgroundColor: '#532D5A',
  },
  score: {
    color: 'hotpink',
    position: 'absolute',
    textAlign: 'center',
  },
})
