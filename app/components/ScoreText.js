'use strict';

import React from 'react';
import Component from './Component';
import { connect } from 'react-redux'
import Text from './Text';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const {height} = Dimensions.get('window')

class ScoreText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaveAnim: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(props) {
    if( props.text && !this.props.text ) {
      Animated.timing(
        this.state.leaveAnim,
        { toValue: 1, duration: 2000, }
      ).start()
    }
  }

  render() { return (
    <Animated.View style={[style.container, {
      bottom: this.state.leaveAnim.interpolate({
        inputRange: [0, .1, 0.5, 1],
        outputRange: [-32, 0, 0, height],
      }),
    }]}>
      <Text style={style.text}>{this.props.text}</Text>
    </Animated.View>
  )}
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  text: {
    color: '#532D5A',
    fontSize: 32,
  },
})

function mapStateToProps(state) {
  return {
    text: state.score.encouragement,
  }
}

export default connect(mapStateToProps)(ScoreText)
