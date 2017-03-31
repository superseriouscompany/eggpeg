'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import Victory            from './Victory'
import GameHeader         from './GameHeader'
import GameOver           from './GameOver'
import Level              from './Level'
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
  }

  componentWillReceiveProps(props) {
    if( props.world.name === 'Demo' ) { return; }

    // TODO: move this out of here
    if( this.state.topScore ) { return; }
    if( props.currentScore > props.world.score)  {
      this.setState({topScore: true})
    }
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
        :
          <View style={{flex: 1, backgroundColor: this.props.level.color}}>
            { this.props.level.done && !this.props.level.win ?
              <GameOver
                reset={this.props.reset}
                continue={this.props.continue} />
            :
              <GameHeader
                tries={this.props.chamber}
                score={this.props.score.total || 0}
                topScore={this.state.topScore} />
            }
            <Level />
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
