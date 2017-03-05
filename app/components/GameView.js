'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import Result from './Result'
import Bullet from './Bullet'
import Target from './Target'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class GameView extends Component {
  static propTypes = {
    shoot: PropTypes.func.isRequired,
    retry: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true} />

        { this.props.result.done ?
          <Result win={this.props.result.win} retry={this.props.retry} />
        :
          <TouchableWithoutFeedback onPress={(e) => this.props.shoot(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
            <View style={style.container}>
              <Text style={style.tries}>{this.props.chamber} {this.props.chamber == 1 ? 'try' : 'tries'} left</Text>
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
    backgroundColor: '#8B5097',
  },
  tries: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})
