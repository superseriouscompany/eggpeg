'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {changeMode} from '../actions/difficulty'
import {
  TouchableOpacity,
  View,
} from 'react-native';

class DifficultySwitch extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  render() { return (
    <TouchableOpacity onPress={this.toggle}>
      <Text>{this.props.difficulty}</Text>
    </TouchableOpacity>
  )}

  toggle() {
    const mode = this.props.difficulty === 'easy' ? 'hard' : 'easy';
    this.props.dispatch(changeMode(mode))
  }
}

function mapStateToProps(state) {
  return {
    difficulty: state.difficulty,
  }
}

export default connect(mapStateToProps)(DifficultySwitch)
