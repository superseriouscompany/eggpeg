'use strict';

import React, {PropTypes} from 'react';
import Bullet             from './Bullet';
import Component          from './Component';
import ScoreText          from './ScoreText';
import Target             from './Target';
import Text               from './Text';
import {connect}          from 'react-redux'
import GameLoop           from '../providers/GameLoop'
import sounds             from '../sounds'
import config             from '../config'
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

let running = true;
let bombwhistleTimeout = false;

const {width, height} = Dimensions.get('window')

class Level extends Component {
  static propTypes = {
    level: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.shoot = this.shoot.bind(this)
    this.state = {
      swapAnim: new Animated.Value(.5),
      targets:     [],
      nextTargets: [],
    }
  }

  componentDidMount() {
    this.setState({targets: this.props.targets})
  }

  componentWillReceiveProps(props) {
    if( props.level.index === 0 ) {
      this.setState({targets: props.targets})
      this.state.swapAnim.setValue(0.5)
    }

    if( props.level.name != this.props.level.name ) {
      this.setState({
        nextTargets: props.targets,
      })
      this.props.dispatch({type: 'level:loading'})
      Animated.timing(
        this.state.swapAnim,
        {toValue: 1, duration: config.timings.levelOut, easing: Easing.back() }
      ).start(() => {
        this.setState({
          targets:     this.state.nextTargets,
          nextTargets: [],
        })

        this.state.swapAnim.setValue(0)
        Animated.timing(
          this.state.swapAnim,
          {toValue: .5, easing: Easing.elastic(1), }
        ).start(() => {
          this.props.dispatch({type: 'level:loading:finished'})
        })
      })
    }
  }

  shoot(e) {
    if( this.props.level.done || this.props.level.finishTime || this.props.level.loading ) { return; }
    if( !this.props.chamber ) { return; }
    const {pageX, pageY} = e.nativeEvent;
    this.props.dispatch({type: 'bullets:fire', x: pageX, y: pageY})
    bombwhistleTimeout && clearTimeout(bombwhistleTimeout);
    sounds.bombwhistle.stop()
    sounds.bombwhistle.play(null, (err) => {
      console.error(err)
    })

    bombwhistleTimeout = setTimeout(() => {
      sounds.bombwhistle.stop()
    }, config.bullet.delay)
  }

  render() { return (
    <GameLoop>
      <TouchableWithoutFeedback onPress={this.shoot}>
        <Animated.View style={{
          flex: 1,
          transform: [
            {
              translateX: this.state.swapAnim.interpolate({
                inputRange:  [0, 0.5, 1],
                outputRange: [width, 0, -width],
              })
            },
          ],
        }}>
          { this.state.targets.map((target, key) => (
            <Target key={this.props.level.name + '-' + key} target={target} hit={target.hit} color={this.props.level.targetColor} deadColor={this.props.level.deadColor} swapAnim={this.state.swapAnim}/>
          ))}
          { this.props.bullets.map((bullet, key) => (
            <Bullet key={this.props.level.name + '-' + key} bullet={bullet} hit={bullet.hit} yolkColor={this.props.level.yolkColor} shadowColor={this.props.level.color}/>
          ))}
        </Animated.View>
      </TouchableWithoutFeedback>
    </GameLoop>
  )}
}

const style = StyleSheet.create({
})

function mapStateToProps(state) {
  return {
    bullets:    state.bullets,
    targets:    state.targets,
    level:      state.level,
    chamber:    state.chamber,
    hint:       state.level.hint,
  }
}

export default connect(mapStateToProps)(Level)
