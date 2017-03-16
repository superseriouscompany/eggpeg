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
import config from '../config'
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
    this.state = { newHighScore: false }
    this.completeRainbowAnimation = this.completeRainbowAnimation.bind(this)
  }

  componentWillReceiveProps(props) {
    // TODO: clean this up and move it somewhere it belongs
    const {highScores} = this.props.score
    if( !highScores.length || props.currentScore === this.props.currentScore ) { return; }
    if( this.state.scoreIndex && this.state.scoreIndex < 0 ) { return; }
    let index;
    for(var i = 0; i < (this.state.scoreIndex + 1 || highScores.length); i++ ) {
      if( props.currentScore > highScores[i] ){
        index = i;
        break;
      }
    }
    if( index === undefined ) { return; }
    this.setState({
      newHighScore: true,
      topScore: index === 0,
      scoreIndex: --index,
    })
  }

  completeRainbowAnimation() {
    this.setState({
      newHighScore: false
    })
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
          <View style={{flex: 1, backgroundColor: this.props.level.color}}>
            <GameHeader
              tries={this.props.chamber}
              score={this.props.score.total || 0}
              newHighScore={this.state.newHighScore}
              completeRainbowAnimation={this.completeRainbowAnimation} />
            <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
              <View style={{flex: 1}}>
                { this.props.targets.map((target, key) => (
                  <Target key={key} target={target} hit={target.hit}/>
                ))}
                { this.props.bullets.map((bullet, key) => (
                  <Bullet key={key} bullet={bullet} hit={bullet.hit}/>
                ))}
                { this.props.level.hint ?
                  <View style={style.hintContainer}>
                    <Text style={style.hint}>{this.props.level.hint}</Text>
                  </View>
                :
                  <ScoreText />
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
    zIndex: -1,
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
