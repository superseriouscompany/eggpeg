'use strict'

import React     from 'react'
import Component from '../components/Component'
import Text      from '../components/Text'
import config    from '../config'
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native'

export default class WorldScore extends Component {
  constructor(props) {
    super(props)
    this.state = { anim: new Animated.Value(0) }
  }

  componentDidMount() {
    if( !this.props.animate ) { return this.state.anim.setValue(1); }
    setTimeout(() => {
      Animated.spring(this.state.anim, {
        toValue: 1,
        friction: 3,
        tension: 40,
      }).start()
    }, config.timings.worldScoreDelay)
  }

  render() { return (
    <Animated.Text style={[{color: this.props.color}, {
      fontSize: this.state.anim.interpolate({
        inputRange:  [0, 1],
        outputRange: [256, 64],
      }),
      opacity: this.state.anim.interpolate({
        inputRange: [0, 0.1],
        outputRange: [0, 1],
      })
    }]}>{this.props.score}</Animated.Text>
  )}
}
