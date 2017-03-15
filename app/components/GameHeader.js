'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';

import {
  Animated,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class GameHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreAnim: new Animated.Value(0),
      score: props.score,
    }
    this.displayScore = this.displayScore.bind(this)
    this.state.scoreAnim.addListener(this.displayScore);
  }

  componentWillUnmount() {
    this.state.scoreAnim.removeListener(this.displayScore);
  }

  displayScore(animation) {
    this.setState({
      score: Math.round(this.props.score - this.state.delta + this.state.delta * animation.value)
    })
  }

  componentWillReceiveProps(props) {
    if( props.score != this.props.score ) {
      this.setState({
        delta: props.score - (this.props.score || 0),
      })
      Animated.timing(
        this.state.scoreAnim,
        {toValue: 1, duration: 500}
      ).start(() => {
        this.setState({
          score: props.score,
        })
      });
    }
  }

  render() { return (
    <View style={style.header}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Egg filled={this.props.tries >= 1} />
        <Egg filled={this.props.tries >= 2} />
        <Egg filled={this.props.tries >= 3} />
      </View>
      <Animated.Text style={[style.score, {
        fontSize: this.state.scoreAnim.interpolate({
          inputRange:  [0, .5, 1],
          outputRange: [18, 26, 18],
        })
      }]}>
        {this.state.score}
      </Animated.Text>
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
