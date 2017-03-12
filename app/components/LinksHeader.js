'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class LinksHeader extends Component {
  constructor(props) {
    super(props)
    this.shareDialog = this.shareDialog.bind(this)
  }

  render() { return (
    <View style={style.header}>
      <TouchableOpacity style={style.leftNav} onPress={() => this.props.dispatch({type: 'scene:change', scene: 'AboutUs'})}>
        <Text style={[this.props.textStyle,{fontStyle: 'italic'}]}>who?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.rightNav} onPress={this.shareDialog}>
        <Text style={[this.props.textStyle, {fontStyle: 'italic', textAlign: 'right'}]}>link</Text>
      </TouchableOpacity>
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

function mapStateToProps(state) {
  return {
    shareLink: state.shareLink,
  }
}

export default connect(mapStateToProps)(LinksHeader)
