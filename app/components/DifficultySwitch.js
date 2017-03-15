'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {changeMode} from '../actions/difficulty'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class DifficultySwitch extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  render() {
    if( !this.props.unlocked ) { return null; }
    return (
      <TouchableOpacity onPress={this.toggle} style={this.props.style}>
        <Text style={this.props.dark ? style.dark : style.light}>{this.props.mode}</Text>
      </TouchableOpacity>
    )
  }

  toggle() {
    const mode = this.props.mode === 'easy' ? 'hard' : 'easy';
    this.props.dispatch(changeMode(mode))
  }
}

function mapStateToProps(state) {
  return {
    unlocked: state.difficulty.unlocked,
    mode:     state.difficulty.mode,
  }
}

const style = StyleSheet.create({
  dark: {
    color: 'cornflowerblue',
  },
  light: {
    color: 'hotpink',
  },
})

export default connect(mapStateToProps)(DifficultySwitch)
