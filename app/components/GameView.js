'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import Result from './Result'
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
              <View style={[style.head, {
                marginLeft: this.props.head.x,
                width: this.props.head.width,
                height: this.props.head.width
              }]} />
              <View style={[style.bulletContainer, {
                left:   this.props.bullet.x - this.props.bullet.width,
                top:    this.props.bullet.y - this.props.bullet.width,
                width:  this.props.bullet.width * 2,
                height: this.props.bullet.width * 2,
              }]}>
                { this.props.bullet.visible ?
                  <View style={[style.bullet, {
                    width:  this.props.bullet.width,
                    height: this.props.bullet.width}]} />
                : this.props.bullet.shadow > 0 ?
                  <View style={[style.shadow, {
                    width:  this.props.bullet.width * 2 * this.props.bullet.shadow,
                    height: this.props.bullet.width * 2 * this.props.bullet.shadow}]} />

                : null
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
  },
  tries: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  head: {
    backgroundColor: 'slateblue',
    position:        'absolute',
  },
  bullet: {
    backgroundColor: 'orange',
  },
  bulletContainer: {
    borderColor:    'red',
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
  },
  shadow: {
    backgroundColor: 'turquoise',
  },
})
