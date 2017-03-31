'use strict';

import React, {PropTypes} from 'react';
import Bullet             from './Bullet';
import Component          from './Component';
import ScoreText          from './ScoreText';
import Target             from './Target';
import Text               from './Text';
import {connect}          from 'react-redux'
import GameLoop           from '../containers/GameLoop'
import sounds             from '../sounds'
import config             from '../config'
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

let running = true;
let bombwhistleTimeout = false;

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
    if( props.level.name != this.props.level.name ) {
      if( !this.props.level.name || props.level.index === 0 ) {
        this.setState({
          targets: props.targets
        })
        this.state.swapAnim.setValue(0.5)
        return
      }
      this.setState({
        nextTargets: props.targets,
      })
      this.props.dispatch({type: 'level:loading'})
      Animated.timing(
        this.state.swapAnim,
        {toValue: 1, duration: config.timings.levelOut}
      ).start(() => {
        this.setState({
          targets:     this.state.nextTargets,
          nextTargets: [],
        })

        this.state.swapAnim.setValue(0)
        Animated.timing(
          this.state.swapAnim,
          {toValue: .5, duration: config.timings.levelIn }
        ).start(() => {
          this.props.dispatch({type: 'level:loading:finished'})
        })
      })
    } else {
      this.setState({
        targets: props.targets,
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
          opacity: this.state.swapAnim.interpolate({
            inputRange:  [0, 0.5, 1],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              scale: this.state.swapAnim.interpolate({
                inputRange:  [0, 0.5, 1],
                outputRange: [0.5, 1, 2],
              })
            },
          ]
        }}>
          { this.state.targets.map((target, key) => (
            <Target key={this.props.level.name + '-' + key} target={target} hit={target.hit} color={this.props.level.targetColor} deadColor={this.props.level.deadColor}/>
          ))}
          { this.props.bullets.map((bullet, key) => (
            <Bullet key={this.props.level.name + '-' + key} bullet={bullet} hit={bullet.hit} yolkColor={this.props.level.yolkColor} shadowColor={this.props.level.color}/>
          ))}
          { this.props.hint ?
            <View style={style.hintContainer}>
              <Text style={[style.hint, {color: this.props.deadColor}]}>{this.props.hint}</Text>
            </View>
          :
            <ScoreText textColor={this.props.level.deadColor}/>
          }
        </Animated.View>
      </TouchableWithoutFeedback>
    </GameLoop>
  )}
}

const style = StyleSheet.create({
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: -1,
  },
  hint: {
    fontSize: 16,
    marginBottom: 20,
  },
})

function mapStateToProps(state) {
  return {
    bullets:    state.bullets,
    targets:    state.targets,
    level:      state.level,
    chamber:    state.chamber,
  }
}

export default connect(mapStateToProps)(Level)
