'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import Result from './Result'
import Victory from './Victory'
import Bullet from './Bullet'
import Target from './Target'
import GameHeader from './GameHeader'
import GameOver from './GameOver'
import base from '../styles/base'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class GameView extends Component {
  static propTypes = {
    shoot:     PropTypes.func.isRequired,
    reset:     PropTypes.func.isRequired,
    nextLevel: PropTypes.func.isRequired,
    continue:  PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden/>

        { this.props.beat ?
          <View style={style.container}>
            <Victory
              score={this.props.score.total}
              reset={this.props.reset} />
          </View>
        : this.props.level.done && !this.props.level.win ?
          <View style={style.container}>
            <GameOver
              score={this.props.score.total}
              reset={this.props.reset}
              continue={this.props.continue} />
          </View>
        : this.props.level.done && this.props.level.win ?
          <View style={style.container}>
            <GameHeader tries={this.props.chamber} score={this.props.score.level} />
            <Result
              score={this.props.score.total}
              levelScore={this.props.score.level}
              win={this.props.level.win}
              reset={this.props.reset}
              nextLevel={this.props.nextLevel} />
          </View>
        :
          <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
            <View style={style.container}>
              <GameHeader tries={this.props.chamber} score={this.props.score.level || 0}/>
              { this.props.targets.map((target, key) => (
                <Target key={key} target={target} />
              ))}
              { this.props.bullets.map((bullet, key) => (
                <Bullet key={key} bullet={bullet} />
              ))}
            </View>
          </TouchableWithoutFeedback>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.colors.purple,
  },
  tries: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})
