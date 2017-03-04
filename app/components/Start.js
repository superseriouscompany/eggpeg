'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton';
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Start extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
    showAbout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.shareDialog = this.shareDialog.bind(this)
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
        <TouchableOpacity onPress={this.shareDialog}>
          <Text style={{fontStyle: 'italic'}}>show your mom</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

  shareDialog() {
    this.shareTimeout && clearTimeout(this.shareTimeout);
    if( !this.props.shareLink ) {
      this.shareTimeout = setTimeout(this.shareDialog, 200);
      return;
    }

    Share.share({
      message: Platform.OS == 'android' ? `Download Sniper ${this.props.shareLink}` : 'Download Sniper',
      url: this.props.shareLink,
    }, {
      dialogTitle: 'Invite Friends',
      tintColor: 'blue'
    })
  }
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
