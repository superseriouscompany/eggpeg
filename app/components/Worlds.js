'use strict';

import React            from 'react'
import Component        from './Component'
import {connect}        from 'react-redux'
import WorldsView       from '../views/WorldsView'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Worlds extends Component {
  render() {
    return <WorldsView {...this.props}/>
  }
}

function mapStateToProps(state) {
  return {
    worlds:       state.worlds.all.filter((w) => { return w.name !== 'Demo'}),
    showTutorial: !state.tutorial.complete,
    topScore:     state.worlds.all.reduce((acc, w) => { return acc + (w.score || 0)}, 0),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLeaderboard: () => {
      dispatch({type: 'scene:change', scene: 'HallOfFame'})
    },
    loadLevel: (name) => {
      dispatch({type: 'worlds:select', name: name})
      dispatch({type: 'scene:change', scene: 'World'})
    },
    back: () => {
      dispatch({type: 'scene:pop', animation: 'dropBack'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Worlds)
