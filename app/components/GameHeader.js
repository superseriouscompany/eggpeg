'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class GameHeader extends Component {
  render() { return (
    <View style={style.header}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Egg filled={this.props.tries >= 1} />
        <Egg filled={this.props.tries >= 2} />
        <Egg filled={this.props.tries >= 3} />
      </View>
      <Text style={style.score}>{this.props.score}</Text>
    </View>
  )}
}

class Egg extends Component {
  render() {
    const image = this.props.filled ? '../images/Egg.png' : '../images/EggEmpty.png';
    return this.props.filled
      ? <Image source={require('../images/Egg.png')} style={style.egg}/>
      : <Image source={require('../images/EggEmpty.png')} style={style.egg}/>
  }
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 11,
    paddingTop: 9,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  egg: {
    margin: 3,
  },
  score: {
    margin: 3,
    color: 'white',
    backgroundColor: 'transparent',
  }
})
