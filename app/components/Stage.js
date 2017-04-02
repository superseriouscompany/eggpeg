'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import FollowUs           from './FollowUs'
import Start              from './Start'
import Settings           from './Settings'
import World              from './World';
import Worlds             from './Worlds'
import HallOfFame         from './HallOfFame'
import config             from '../config'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

class Stage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
      dropAnim: new Animated.Value(0),
      backAnim: new Animated.Value(0),
      scene:    props.scene,
    }
  }

  componentWillReceiveProps(props) {
    if( props.scene.name != this.props.scene.name ) {
      if( props.scene.animation === 'fadeIn' ) {
        this.setState({
          nextScene: props.scene,
        })
        this.state.fadeAnim.setValue(0)
        Animated.timing(this.state.fadeAnim, {
          duration: config.timings.sceneFadeIn, toValue: 1,
        }).start(() => {
          this.setState({
            scene: props.scene,
            nextScene: null,
          })
        })
      } else if( props.scene.animation === 'dropIn' ) {
        this.setState({
          nextScene: props.scene,
        })
        this.state.dropAnim.setValue(0)
        Animated.timing(this.state.dropAnim, {
          duration: config.timings.sceneDropIn,
          toValue: 1,
          easing: Easing.quad
        }).start(() => {
          this.setState({
            scene: props.scene,
            nextScene: null,
          })
        })
      } else if( props.scene.animation === 'riseOut' ) {
        this.setState({
          scene: props.scene,
          nextScene: this.props.scene,
        })
        this.state.backAnim.setValue(0)
        Animated.timing(this.state.backAnim, {
          duration: config.timings.sceneRiseOut,
          toValue: 1,
          easing: Easing.quad
        }).start(() => {
          this.setState({
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
      <View style={[style.container]}>
        { this.showScene(this.state.scene)}
      </View>

      { this.state.nextScene ?
        <View style={style.overlay}>
          { this.props.scene.animation === 'fadeIn' ?
            <Animated.View style={[style.container, {
              opacity: this.state.fadeAnim.interpolate({
                inputRange:  [0, 1],
                outputRange: [0, 1],
              }),
            }]}>
              { this.showScene(this.state.nextScene) }
            </Animated.View>
          : this.props.scene.animation === 'dropIn' ?
            <Animated.View style={[style.container, {
              top: this.state.dropAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0],
              }),
            }]}>
              { this.showScene(this.state.nextScene, {animating: true}) }
            </Animated.View>
          : this.props.scene.animation === 'riseOut' ?
            <Animated.View style={[style.container, {
              top: this.state.backAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -height],
              }),
            }]}>
              { this.showScene(this.state.nextScene, {animating: true}) }
            </Animated.View>
          :
            <Text>Nope</Text>
          }
        </View>
      : null }
    </View>
  )}

  showScene(scene, props) {
    props = {
      ...props,
      ...scene.props,
    }

    switch(scene.name) {
      case 'World':
        return <World />
      case 'AboutUs':
        return <FollowUs />
      case 'Start':
        return <Start />
      case 'Worlds':
        return <Worlds {...props} />
      case 'Settings':
        return <Settings />
      case 'HallOfFame':
        return <HallOfFame {...props} />
      default:
        return <View style={{backgroundColor: 'indianred', width: 100, height: 100}}/>
    }
  }
}

function mapStateToProps(state) {
  return {
    scene: state.scene.current,
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
