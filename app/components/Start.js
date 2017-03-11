'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import EggDrop from './EggDrop';
import LinksHeader from './LinksHeader';
import base from '../styles/base';
import {
  Platform,
  Share,
  StatusBar,
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
    this.state            = {}
    this.shareDialog      = this.shareDialog.bind(this)
  }

  render() {
    return (
    <View style={[style.container]}>
      <StatusBar hidden/>

      <View style={{flex: 1}}>
        <LinksHeader />
        <View style={style.main}>
          <EggDrop />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.props.startGame} style={style.startButton}>
              <Text style={{fontStyle: 'italic', fontSize: 32, color: base.colors.grey}}>play</Text>
            </TouchableOpacity>
          </View>
        </View>
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
      message: Platform.OS == 'android' ? `Download Egg Peg ${this.props.shareLink}` : 'Download Egg Peg',
      url: this.props.shareLink,
    }, {
      dialogTitle: 'Invite Friends',
      tintColor: 'blue'
    })
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.colors.beige,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 1,
    borderColor: base.colors.grey,
    borderRadius: 5,
    width: 200,
    height: 75,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
