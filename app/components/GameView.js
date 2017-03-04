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
              { this.props.bullets.map((bullet, key) => (
                <View key={key} style={[style.bulletContainer, {
                  left:   bullet.x - bullet.width,
                  top:    bullet.y - bullet.width,
                  width:  bullet.width * 2,
                  height: bullet.width * 2,
                }]}>
                  { bullet.visible ?
                    <View style={[style.bullet, {
                      width:  bullet.width,
                      height: bullet.width}]} />
                  : bullet.shadow > 0 ?
                    <View style={[style.shadow, {
                      width:  bullet.width * 2 * bullet.shadow,
                      height: bullet.width * 2 * bullet.shadow}]} />
                  : bullet.spent ?
                    <View style={[style.casing, {
                      width:  bullet.width,
                      height: bullet.width,
                    }]} />
                  : null
                  }
                </View>
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
  casing: {
    position: 'absolute',
    borderColor: 'indianred',
    borderWidth: 1,
  },
  bulletContainer: {
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
  },
  shadow: {
    backgroundColor: 'turquoise',
  },
})
