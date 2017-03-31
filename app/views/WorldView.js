'use strict';

import React, {Component, PropTypes} from 'react';
import Text                          from '../components/Text';
import Victory                       from '../components/Victory'
import GameHeader                    from '../components/GameHeader'
import GameOver                      from '../components/GameOver'
import Level                         from '../components/Level'
import base                          from '../styles/base'
import config                        from '../config'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class WorldView extends Component {
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
})
