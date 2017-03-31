'use strict';

import React, {PropTypes} from 'react'
import Component          from './Component'
import Text               from './Text'
import EggDrop            from './EggDrop'
import LinksHeader        from './LinksHeader'
import base               from '../styles/base'
import config             from '../config'
import {connect}          from 'react-redux'
import {clear}            from '../reducers'
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Start extends Component {
  constructor(props) {
    super(props)
    this.state     = {}
    this.startGame = this.startGame.bind(this)
  }

  clearStore() {
    clear((err) => {
      if( err ) { console.error(err) }
      alert('Store purged!')
    })
  }

  render() {
    return (
    <View style={[style.container]}>
      <StatusBar hidden/>

      <View style={{flex: 1}}>
        <LinksHeader />
        <View style={style.main}>
          <EggDrop />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.startGame} style={style.startButton}>
              <Text style={style.startButtonText}>play</Text>
            </TouchableOpacity>
          </View>
        </View>
        { __DEV__ ?
          <TouchableOpacity onPress={this.clearStore}>
            <Text>Clear all data</Text>
          </TouchableOpacity>
        : null}
      </View>
    </View>
  )}

  startGame() {
    if( this.props.showDemo ) {
      this.props.dispatch({type: 'worlds:select', name: 'Demo'})
      this.props.dispatch({type: 'scene:change', scene: 'World'})
    } else {
      this.props.dispatch({type: 'scene:change', scene: 'Worlds', animation: 'dropBack'})
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.colors.beige,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 1,
    borderColor: base.colors.grey,
    borderRadius: 5,
    width: 200,
    height: 75,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontStyle: 'italic',
    fontSize: 32,
    color: base.colors.grey,
  }
})

function mapStateToProps(state) {
  return {
    shareLink: state.shareLink,
    worlds:    state.worlds,
    showDemo:  !state.tutorial.complete && !config.skipDemo,
  }
}

export default connect(mapStateToProps)(Start)
