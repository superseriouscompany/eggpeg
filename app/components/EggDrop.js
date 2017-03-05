'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class EggDrop extends Component {
  render() { return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Bar color="#79B249" />
        <Bar color="#F5B840" />
        <Bar color="#EA8A39" />
        <Bar color="#D1534A" />
        <Bar color="#8B5097" />
        <Bar color="#389ED9" />
      </View>
      <Image source={require('../images/Oval.png')} style={style.egg}/>
    </View>
  )}
}

class Bar extends Component {
  render() { return (
    <View style={[style.bar, {backgroundColor: this.props.color}]} />
  )}
}

const style = StyleSheet.create({
  bar: {
    width: 20,
    height: 350,
  },
  egg: {
    marginTop: -100,
  }
})
