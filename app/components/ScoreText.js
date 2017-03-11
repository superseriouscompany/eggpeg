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
      enterAnim: new Animated.Value(-32),
      leaveAnim: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(props) {
    if( props.text && !this.props.text ) {
      Animated.sequence([
        Animated.spring(
          this.state.enterAnim,
          { toValue: 0, friction: 4, }
        ),
        Animated.timing(
          this.state.leaveAnim,
          { toValue: 1, duration: 1000, }
        )
      ]).start()
    }
  }

  render() { return (
    <Animated.View style={[style.container, {
      bottom: this.state.enterAnim,
      opacity: this.state.leaveAnim.interpolate({
        inputRange:  [0, 1],
        outputRange: [1, 0],
      }),
    }]}>
      <Animated.Text style={[style.text, {
        fontSize: this.state.leaveAnim.interpolate({
          inputRange:  [0, 1],
          outputRange: [32, 100],
        })
      }]}>{this.props.text}</Animated.Text>
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
  },
})

function mapStateToProps(state) {
  return {
    text: state.score.encouragement,
  }
}

export default connect(mapStateToProps)(ScoreText)
