'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import FollowUs           from './FollowUs'
import Start              from './Start'
import Settings           from './Settings'
import World              from './World';
import Worlds             from './Worlds'
import HallOfFame         from './HallOfFame'
import {
  View
} from 'react-native'

class Stage extends Component {
  render() { return (
    <View style={{flex: 1}}>
      { this.props.scene == 'World' ?
        <World />
      : this.props.scene == 'AboutUs' ?
        <FollowUs />
      : this.props.scene == 'Start' ?
        <Start />
      : this.props.scene == 'Worlds' ?
        <Worlds {...this.props.sceneProps} />
      : this.props.scene == 'Settings' ?
        <Settings />
      : this.props.scene == 'HallOfFame' ?
        <HallOfFame {...this.props.sceneProps}/>
      :
        <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
      }
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    scene:      state.scene.current,
    sceneProps: state.scene.props,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
