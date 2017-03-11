'use strict';

import React, { PropTypes } from 'react';
import Component from './Component';
import base from '../styles/base'
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

export default class RainbowBar extends Component {
  render() {
    return(
      <View style={style.barContainer}>
        <Bar color={base.colors.green} />
        <Bar color={base.colors.yellow} />
        <Bar color={base.colors.orange} />
        <Bar color={base.colors.red} />
        <Bar color={base.colors.purple} />
        <Bar color={base.colors.blue} />
      </View>
    )
  }
}

function Bar(props) {
  return (
    <View style={[style.bar, {backgroundColor: props.color}]} />
  )
}

const barHeight = 25;

const style = StyleSheet.create({
  bar: {
    height: barHeight,
    width: '100%'
  },
  barContainer: {
    position: 'absolute',
  },
});
