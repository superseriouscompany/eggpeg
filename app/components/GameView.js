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
import {loadProducts} from '../actions/purchases'
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

  componentDidMount() {
    loadProducts((err, products) => {
      if( err ) { alert(err) }
      this.setState({
        products: products,
      })
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
            highScores={[
              { score: this.props.score.total + 10, time: new Date },
              { score: this.props.score.total, time: new Date },
              { score: this.props.score.total - 50, time: new Date },
            ]} />
        : this.props.level.done && !this.props.level.win ?
          <GameOver
            products={this.state.products}
            score={this.props.score.total}
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
          <View style={{flex: 1}}>
            <GameHeader tries={this.props.chamber} score={this.props.score.level || 0} />
            <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
              <View style={{flex: 1}}>
                { this.props.targets.map((target, key) => (
                  <Target key={key} target={target} />
                ))}
                { this.props.bullets.map((bullet, key) => (
                  <Bullet key={key} bullet={bullet} />
                ))}
              </View>
            </TouchableWithoutFeedback>
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
