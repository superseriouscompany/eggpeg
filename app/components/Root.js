'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class Root extends Component {
  render() { return (
    <View style={style.container}>
      <Text>Hello</Text>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
