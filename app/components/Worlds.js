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
    topScore:     (state.score.highScores || [])[0],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLeaderboard: () => {
      dispatch({type: 'scene:change', scene: 'HallOfFame'})
    },
    loadLevel: (name) => {
      dispatch({type: 'worlds:select', name: name})
      dispatch({type: 'scene:change', scene: 'Game'})
    },
    back: () => {
      dispatch({type: 'scene:pop'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Worlds)
