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
    <View style={[style.container, {flex: 1}]}>
      <View style={style.header}>
        <TouchableOpacity style={style.who} onPress={this.props.showAbout}>
          <Text style={{fontStyle: 'italic'}}>who dis?</Text>
        </TouchableOpacity>
        <PayButton />
      </View>
      <View style={style.main}>
        <TouchableOpacity onPress={this.props.startGame}>
          <Text style={{fontStyle: 'italic', fontSize: 32}}>start</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <TouchableOpacity onPress={this.shareLink}>
          <Text style={{fontStyle: 'italic'}}>show your mom</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 12,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
  }
})
