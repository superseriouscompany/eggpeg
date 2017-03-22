'use strict';

import React, {Component} from 'react';
import {connect}          from 'react-redux';
import {changeMode}       from '../actions/difficulty';

class DifficultyProvider extends Component {
  componentWillReceiveProps(props)  {
    if( this.props.difficulty.mode != props.difficulty.mode ) {
      this.props.dispatch(changeMode(props.difficulty.mode))
    }
  }

  render() { return this.props.children; }
}

function mapStateToProps(state) {
  return {
    difficulty: state.difficulty,
  }
}

export default connect(mapStateToProps)(DifficultyProvider)
