'use strict'

import React     from 'react'
import Component from './Component'
import Text      from './Text'
import {connect} from 'react-redux'
import {
  ScrollView,
  View,
} from 'react-native'

class Scratch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onStartShouldSetResponder(e) {
    console.warn('started')
    return true
  }

  move(e) {
    const {pageX, pageY} = e.nativeEvent
    console.warn('moved', pageX, pageY)
  }

  render() { return (
    <View
      style={{flex: 1, backgroundColor: 'hotpink'}}
      onStartShouldSetResponder={() => true}
      onResponderMove={(evt) => this.setState({x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY})}
    >
      <Text>
        x: {this.state.x}, y: {this.state.y}
      </Text>
    </View>
  )}
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Scratch)
