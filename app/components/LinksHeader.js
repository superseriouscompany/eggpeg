'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LinksHeader extends Component {
  render() { return (
    <View style={style.header}>
      <TouchableOpacity style={style.leftNav} onPress={this.props.showAbout}>
        <Text style={[this.props.textStyle,{fontStyle: 'italic'}]}>who?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.rightNav} onPress={this.shareDialog}>
        <Text style={[this.props.textStyle, {fontStyle: 'italic', textAlign: 'right'}]}>link</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({
  header: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  leftNav: {
    width: 120,
    padding: 20,
    paddingRight: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  rightNav: {
    width: 120,
    padding: 20,
    paddingLeft: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
})
