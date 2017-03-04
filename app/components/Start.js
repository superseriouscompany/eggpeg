'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import PayButton from './PayButton';
import PayDialog from './PayDialog';
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
    this.state            = {}
    this.shareDialog      = this.shareDialog.bind(this)
    this.payDialog        = this.payDialog.bind(this)
    this.dismissPayDialog = this.dismissPayDialog.bind(this)
  }

  render() { return (
    <View style={[style.container, {flex: 1}]}>
      { this.state.paying ?
        <PayDialog back={() => this.setState({paying: false})} product={this.state.product}/>
      :
        <View style={{flex: 1}}>
          <View style={style.header}>
            <TouchableOpacity style={style.leftNav} onPress={this.props.showAbout}>
              <Text style={{fontStyle: 'italic'}}>who dis?</Text>
            </TouchableOpacity>
            <PayButton payDialog={this.payDialog}/>
          </View>
          <View style={style.main}>
            <TouchableOpacity onPress={this.props.startGame}>
              <Text style={{fontStyle: 'italic', fontSize: 32}}>start</Text>
            </TouchableOpacity>
          </View>
          <View style={style.footer}>
            <TouchableOpacity onPress={this.shareDialog}>
              <Text style={{fontStyle: 'italic'}}>show your dad</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
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

  payDialog(id, title, description, priceString) {
    this.setState({
      paying: true,
      product: {
        id,
        title,
        description,
        priceString,
      }
    })
  }

  dismissPayDialog() {
    this.setState({
      paying: false,
    })
  }
}

const style = StyleSheet.create({
  header: {
    zIndex: 69,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftNav: {
    width: 120,
    padding: 20,
    paddingTop: 18,
    paddingRight: 0
  },
  main: {
    flex: 1,
    marginTop: -50,
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
