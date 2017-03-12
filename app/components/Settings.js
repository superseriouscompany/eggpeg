'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Settings extends Component {
  render() { return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
        <Text>Hiyeeeee</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  }
})

export default connect()(Settings)
