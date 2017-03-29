'use strict';

import React, {Component}         from 'react'
import {connect}                  from 'react-redux'
import {enqueueRetry, clearRetry} from '../actions/retry.js'
import {loadScores, postScore}    from '../actions/leaderboard'
import {NetInfo}                  from 'react-native'
import {api}                      from '../actions/api'

class LeaderboardProvider extends Component {
  constructor(props) {
    super(props)
    this.handleConnectionChange = this.handleConnectionChange.bind(this)
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    this.props.dispatch(loadScores()).catch((err) => {
      console.warn("Couldn't load leaderboard. You might be offline?");
      this.props.dispatch(enqueueRetry({type: 'loadScores'}));
    })
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  handleConnectionChange(connected) {
    if( !connected ) { return console.warn('disconnected from the internet') }

    if( connected ) {
      this.props.retry.forEach((request) => {
        // TODO: duplicating logic is an easy place for errors to pop up, and the caller api for this sucks.
        // ideally, retry would be an option that you pass along to the api request? or to the action.
        // needs some more thought.
        if( request.type === 'loadScores' ) {
          this.props.dispatch(loadScores()).then(() => {
            this.props.dispatch(clearRetry(request.id))
          })
        } else if( request.type === 'postScore' ) {
          this.props.dispatch(postScore(request.score, request.name)).then(() => {
            this.props.dispatch(clearRetry(request.id))
          })
        } else {
          console.warn('Unknown request type to retry', request.type)
        }
      })
    }
  }

  render() { return this.props.children }
}

function mapStateToProps(state) {
  return {
    retry: state.retry,
  }
}

export default connect(mapStateToProps)(LeaderboardProvider)
