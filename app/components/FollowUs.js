'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  Image,
  Linking,
  StyleSheet,
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
    <View style={{flex: 1}}>
      <View style={style.header}>
        <TouchableOpacity style={style.leftNav} onPress={this.props.back}>
          <Text>&times;</Text>
        </TouchableOpacity>
      </View>
      <View style={style.main}>
        <View>
          <Text style={{fontSize: 14, textAlign: 'center'}}>this is a piece of poop by</Text>
          <Text style={{fontSize: 32, textAlign: 'center', marginBottom: 5}}>Super Serious Company</Text>
        </View>

        <Image style={{marginBottom: 10}} source={require('../images/CartoonsWorking.png')} />

        <TouchableOpacity onPress={this.visitGram}>
          <Image source={require('../images/IGFollowButton.png')} />
        </TouchableOpacity>
      </View>

      <View style={style.footer}>
        <TouchableOpacity onPress={this.visitSite}>
          <Text style={{fontStyle: 'italic'}}>el websito</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

  visitGram() {
    Linking.openURL('https://instagram.com/superseriouscompany')
  }

  visitSite() {
    Linking.openURL('https://superseriouscompany.com')
  }
}

const style = StyleSheet.create({
  header: {
    zIndex: 69,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftNav: {
    width: 55,
    padding: 20,
    paddingTop: 20,
    paddingRight: 0
  },
  main: {
    marginTop: -60,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    alignItems: 'center',
  }
})
