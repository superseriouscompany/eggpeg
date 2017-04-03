'use strict';

import React, {Component, PropTypes} from 'react'
import {connect}                     from 'react-redux'
import {clear}                       from '../reducers'
import config                        from '../config'
import StartView                     from '../views/StartView'
import RatingRequestor               from 'react-native-rating-requestor'
const RatingTracker = new RatingRequestor('1212152764', {
  title: 'Do you like us?',
  message: 'Do you think we\'re cool',
  actionLabels: {
    decline: 'Nope',
    delay: 'Maybe later...',
    accept: 'Sure!',
  },
  timingFunction: (count) => {
    return true
  },
});


class Start extends Component {
  constructor(props) {
    super(props)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    RatingTracker.handlePositiveEvent()
  }

  clearStore() {
    clear((err) => {
      if( err ) { console.error(err) }
      alert('Store purged!')
    })
  }

  render() { return (
    <StartView {...this.props} startGame={this.startGame} clearStore={this.clearStore} />
  )}

  startGame() {
    if( this.props.showDemo ) {
      this.props.dispatch({type: 'worlds:select', name: 'Demo'})
      this.props.dispatch({type: 'scene:change', scene: 'World'})
    } else {
      this.props.dispatch({type: 'worlds:clear'})
      this.props.dispatch({type: 'scene:change', scene: 'Worlds'})
    }
  }
}

function mapStateToProps(state) {
  return {
    shareLink: state.shareLink,
    worlds:    state.worlds,
    showDemo:  !state.tutorial.complete && !config.skipDemo,
  }
}

export default connect(mapStateToProps)(Start)
