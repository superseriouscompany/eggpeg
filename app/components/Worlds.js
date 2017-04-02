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
    this.loadLevel = this.loadLevel.bind(this)
    this.state = {}
  }

  loadLevel(name) {
    this.setState({
      selectedName: name,
      animateOut:   true,
    })

    setTimeout(() => {
      this.props.loadLevel(name)
    }, config.timings.worldIn)
  }

  render() {
    return <WorldsView {...this.props}
              animateIn={this.props.lastScore}
              animateOut={this.state.animateOut}
              loadLevel={this.loadLevel}
              selectedName={this.state.selectedName || this.props.lastWorld && this.props.lastWorld.name} />
  }
}

function mapStateToProps(state) {
  return {
    worlds:       state.worlds.all.filter((w) => { return w.name !== 'Demo'}),
    showTutorial: !state.tutorial.complete,
    topScore:     state.worlds.all.reduce((acc, w) => { return acc + (w.score || 0)}, 0),
    lastScore:    state.session.score,
    lastWorld:    state.worlds.current,
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
