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

  componentDidMount() {
    if( !this.props.lastScore && false ) { return }
    this.setState({
      selectedName: this.props.lastWorld.name,
    })
    this.state.expandAnim.setValue(1)
    Animated.timing(this.state.expandAnim, {
      toValue: 0, duration: config.timings.worldIn,
    }).start()
  }

  loadLevel(name) {
    this.setState({
      selectedName: name,
    })
    Animated.timing(this.state.expandAnim, {
      toValue: 1, duration: config.timings.worldIn,
    }).start(() => {
      this.props.loadLevel(name)
    })
  }

  render() {
    return <WorldsView {...this.props}
              loadLevel={this.loadLevel}
              expandAnim={this.state.expandAnim}
              selectedName={this.state.selectedName} />
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
