'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  TouchableOpacity,
  View,
} from 'react-native';

export default class FollowUs extends Component {
  render() { return (
    <View>
      <TouchableOpacity onPress={this.props.back}>
        <Text>&lt;</Text>
      </TouchableOpacity>
      <Text style={{padding: 20}}>follow us</Text>
    </View>
  )}
}
