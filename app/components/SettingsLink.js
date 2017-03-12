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

class SettingsLink extends Component {
  render() {
    return (__DEV__ ?
      <View style={style.container}>
        <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:change', scene: 'Settings'})}>
          <Text style={{color: this.props.textColor || 'white'}}>settings</Text>
        </TouchableOpacity>
      </View>
    :
      null)
  }
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
})

export default connect()(SettingsLink)
