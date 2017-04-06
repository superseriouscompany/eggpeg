'use strict'

import React     from 'react'
import Component from '../components/Component'
import Text      from '../components/Text'
import {colors}  from '../styles/base'
import config    from '../config'
import {
  Animated,
  TouchableOpacity,
} from 'react-native'

export default class Foo extends Component {
  constructor(props) {
    super(props)
    this.state   = { shimmer: new Animated.Value(0) }
    this.shimmer = this.shimmer.bind(this)
  }

  componentDidMount() {
    this.shimmer()
  }

  shimmer() {
    Animated.sequence([
      Animated.timing(this.state.shimmer, {
        toValue: 1,
        duration: config.timings.rainbowShimmer,
      }),
      Animated.timing(this.state.shimmer, {
        toValue: 0,
        duration: config.timings.rainbowShimmer,
      }),
    ]).start(this.shimmer)
  }

  render() { return (
    <TouchableOpacity onPress={this.props.onPress}>
      <Animated.View onPress={this.props.onPress} style={[this.props.style, {
        backgroundColor: this.state.shimmer.interpolate({
          inputRange: [0, 1/6, 2/6, 3/6, 4/6, 1],
          outputRange: [colors.green, colors.yellow, colors.orange, colors.red, colors.purple, colors.blue, ],
        }),
      }]}>
          {this.props.children}
      </Animated.View>
    </TouchableOpacity>
  )}
}
