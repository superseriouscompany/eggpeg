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
    <View style={{flexDirection: 'row'}}>
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
  egg: {
    margin: 3,
  },
  score: {
    margin: 3,
    color: 'gainsboro',
  }
})
