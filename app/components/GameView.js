'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import Victory            from './Victory'
import GameHeader         from './GameHeader'
import GameOver           from './GameOver'
import Level              from './Level'
import SettingsLink       from './SettingsLink'
import base               from '../styles/base'
import config             from '../config'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class GameView extends Component {
  static propTypes = {
    reset:     PropTypes.func.isRequired,
    continue:  PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { newHighScore: false }
    this.completeRainbowAnimation = this.completeRainbowAnimation.bind(this)
  }

  componentWillReceiveProps(props) {
    // TODO: clean this up and move it somewhere it belongs
    if( props.level.index < 5 ) { return; }

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
            leaderboard={this.props.leaderboard}
            isHighScore={this.props.score.isHigh || false}
            reset={this.props.reset}
            continue={this.props.continue} />
        :
          <View style={{flex: 1, backgroundColor: this.props.level.color}}>
            <GameHeader
              tries={this.props.chamber}
              score={this.props.score.total || 0}
              newHighScore={this.state.newHighScore}
              completeRainbowAnimation={this.completeRainbowAnimation} />
            <Level />
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
  tries: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})
