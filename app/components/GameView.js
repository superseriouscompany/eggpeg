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
import ScoreText from './ScoreText'
import SettingsLink from './SettingsLink'
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

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={style.container}>
        <StatusBar hidden/>

        { this.props.beat ?
          <Victory
            score={this.props.score.total}
            reset={this.props.reset}
            highScores={this.props.score.highScores}
            isHighScore={true} />
        : this.props.level.done && !this.props.level.win ?
          <GameOver
            score={this.props.score.total}
            highScores={this.props.score.highScores}
            isHighScore={this.props.score.isHigh || false}
            reset={this.props.reset}
            continue={this.props.continue} />
        : this.props.level.done && this.props.level.win ?
          <Result
            score={this.props.score.total}
            levelScore={this.props.score.level}
            win={this.props.level.win}
            reset={this.props.reset}
            nextLevel={this.props.nextLevel} />
        :
          <View style={{flex: 1, backgroundColor: this.props.level.color || 'hotpink'}}>
            <GameHeader tries={this.props.chamber} score={this.props.score.total || 0} />
            <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
              <View style={{flex: 1}}>
                { this.props.targets.map((target, key) => (
                  <Target key={key} target={target} hit={target.hit}/>
                ))}
                { this.props.bullets.map((bullet, key) => (
                  <Bullet key={key} bullet={bullet} />
                ))}
                { this.props.currentLevel === 0 ?
                  <View style={style.hintContainer}>
                    <Text style={style.hint}>Tap the target to drop an egg on it.</Text>
                  </View>
                :
                  <ScoreText override={this.props.level.level === 0 ? 'Drop an Egg on the Target' : null}/>
                }
              </View>
            </TouchableWithoutFeedback>
            { this.props.level.name !== 'Stationary' ?
              <SettingsLink />
            : null }
          </View>
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
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  hint: {
    color: '#532D5A',
    fontSize: 16,
    marginBottom: 20,
  },
  tries: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})
