'use strict';

import React     from 'react';
import Component from './Component';
import Text      from './Text';
import base      from '../styles/base';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default class EggDrop extends Component {
  render() { return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Bar color={base.colors.green} />
        <Bar color={base.colors.yellow} />
        <Bar color={base.colors.orange} />
        <Bar color={base.colors.red} />
        <Bar color={base.colors.purple} />
        <Bar color={base.colors.blue} />
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
    height: windowHeight * 0.537,
  },
  egg: {
    marginTop: -100,
    resizeMode: 'contain',
  }
})
