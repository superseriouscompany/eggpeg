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
  Animated,
  StyleSheet,
  View,
} from 'react-native'

class Stage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
      dropAnim: new Animated.Value(1),
      scene:    props.scene,
    }
  }

  componentWillReceiveProps(props) {
    if( props.scene != this.props.scene ) {
      if( props.animation === 'fade' ) {
        this.setState({
          nextScene: props.scene,
        })
        this.state.fadeAnim.setValue(0)
        Animated.timing(this.state.fadeAnim, {
          duration: 1000, toValue: 1,
        }).start(() => {
          this.setState({
            scene: props.scene,
            nextScene: null,
          })
        })
      } else {
        this.setState({
          scene: props.scene,
          nextScene: null,
        })
      }
    }
  }

  render() { return (
    <View style={style.container}>
      <View style={style.container}>
        { this.showScene(this.state.scene, this.state.sceneProps)}
      </View>

      { this.state.nextScene ?
        <View style={style.overlay}>
          <Animated.View style={[style.container, {
            opacity: this.state.fadeAnim.interpolate({
              inputRange:  [0, 1],
              outputRange: [0, 1],
            })
          }]}>
            {
              this.showScene(this.state.nextScene, this.state.nextSceneProps)
            }
          </Animated.View>
        </View>
      : null }
    </View>
  )}

  showScene(scene, sceneProps) {
    switch(scene) {
      case 'World':
        return <World />
      case 'AboutUs':
        return <FollowUs />
      case 'Start':
        return <Start />
      case 'Worlds':
        return <Worlds {...sceneProps} />
      case 'Settings':
        return <Settings />
      case 'HallOfFame':
        return <HallOfFame {...sceneProps} />
      default:
        return <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
    }
  }
}

function mapStateToProps(state) {
  return {
    scene:      state.scene.current,
    sceneProps: state.scene.props,
    animation:  state.scene.animation,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
