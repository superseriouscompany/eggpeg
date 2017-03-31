import React, {Component} from 'react'
import {connect}          from 'react-redux'
import config             from '../config'
import worlds             from '../worlds'

class DevProvider extends Component {
  componentDidMount() {
    if( !__DEV__ ) { return }

    if( config.startingLevel ) {
      const world = worldForLevel(config.startingLevel)
      this.props.dispatch({type: 'worlds:select', name: world.name})
      this.props.dispatch({type: 'scene:change', scene: 'Game'})
    }
  }

  render() { return this.props.children }
}

function worldForLevel(levelName) {
  return worlds.find((w) => {
    return !!w.levels.find((l) => {
      return l.name === levelName
    })
  })
}

export default connect()(DevProvider)
