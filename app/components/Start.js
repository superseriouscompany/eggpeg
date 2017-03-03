'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Start extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
    showAbout: PropTypes.func.isRequired,
  }

  render() { return (
    <View style={{flex: 1}}>
      <View style={style.header}>
        <TouchableOpacity style={style.who} onPress={this.props.showAbout}>
          <Text>who dis?</Text>
        </TouchableOpacity>
        <PayButton />
      </View>
      <View style={style.main}>
        <TouchableOpacity onPress={this.props.startGame}>
          <Text>start</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <TouchableOpacity onPress={this.shareLink}>
          <Text>show your mom</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
  }
})
