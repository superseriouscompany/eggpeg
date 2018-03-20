import React, {Component} from 'react'
import {connect}          from 'react-redux'
import sounds             from '../sounds'

class MusicProvider extends Component {
  componentWillReceiveProps(props) {
    const music = sceneMusic(props.sceneName)
    const previousMusic = sceneMusic(this.props.sceneName)
    if( this.props.sceneName && music == previousMusic ) {
      return
    }

    sounds[previousMusic].stop()
    sounds[music].setNumberOfLoops(-1).play()
  }

  componentDidMount() {
    if( this.props.sceneName ) {
      setTimeout(() => {
        sounds[sceneMusic(this.props.sceneName)].setNumberOfLoops(-1).play()
      }, 2000)
    }
  }

  componentWillUnmount() {
    sounds[sceneMusic(this.props.sceneName)].stop()
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    sceneName: state.scene.current.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

function sceneMusic(scene) {
  switch(scene) {
    case 'World': case 'ContinueBundles':
      return 'musicGame'
    default:
      return 'musicMenu'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicProvider)
