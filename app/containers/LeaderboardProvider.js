'use strict';

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {loadScores}       from '../actions/leaderboard'

class LeaderboardProvider extends Component {
  componentDidMount() {
    console.log('loading leaderboard')
    this.props.dispatch(loadScores())
  }

  render() { return this.props.children }
}

export default connect()(LeaderboardProvider)
