'use strict';

import React            from 'react'
import Component        from './Component'
import {connect}        from 'react-redux'
import config           from '../config'
import WorldsView       from '../views/WorldsView'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Worlds extends Component {
  constructor(props) {
    super(props)
    this.state = { expandAnim: new Animated.Value(0) }
    this.loadLevel = this.loadLevel.bind(this)
  }

  loadLevel(name) {
    Animated.timing(this.state.expandAnim, {
      toValue: 1, duration: config.timings.worldIn,
    }).start(() => {
      this.props.loadLevel(name)
    })
  }

  render() {
    return <WorldsView {...this.props} loadLevel={this.loadLevel} expandAnim={this.state.expandAnim}/>
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
      dispatch({type: 'scene:change', scene: 'HallOfFame', animation: 'dropIn'})
    },
    loadLevel: (name) => {
      dispatch({type: 'worlds:select', name: name})
      dispatch({type: 'scene:change', scene: 'World'})
    },
    back: () => {
      dispatch({type: 'scene:change', scene: 'Start' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Worlds)
