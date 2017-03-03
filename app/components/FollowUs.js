'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

export default class FollowUs extends Component {
  constructor(props) {
    super(props)
    this.visitGram = this.visitGram.bind(this)
    this.visitSite = this.visitSite.bind(this)
  }

  render() { return (
    <View>
      <TouchableOpacity onPress={this.props.back}>
        <Text>&lt;</Text>
      </TouchableOpacity>
      <Text style={{padding: 20}}>follow us</Text>

      <TouchableOpacity onPress={this.visitGram}>
        <Text>Follow us on the gram</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.visitSite}>
        <Text>See our janky webpage</Text>
      </TouchableOpacity>
    </View>
  )}

  visitGram() {
    Linking.openURL('https://instagram.com/superseriouscompany')
  }

  visitSite() {
    Linking.openURL('https://superseriouscompany.com')
  }
}
