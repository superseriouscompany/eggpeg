'use strict'

import React     from 'react'
import Component from '../components/Component'
import Text      from '../components/Text'
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native'

const {width} = Dimensions.get('window')

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {anim: new Animated.Value(0)}
  }

  componentWillReceiveProps(props) {
    if( props.progress === this.props.progress ) { return; }

    Animated.spring(this.state.anim, {
      toValue:  props.progress * width,
      friction: 4,
      tension:  40,
    }).start()
  }

  render() { return (
    <Animated.View style={[this.props.style, {
      backgroundColor: this.props.color,
      width:           this.state.anim,
    }]} />
  )}
}
