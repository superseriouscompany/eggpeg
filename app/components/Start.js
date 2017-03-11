'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import EggDrop from './EggDrop';
import LinksHeader from './LinksHeader';
import base from '../styles/base';
import {connect} from 'react-redux';
import {
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';


class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.startGame = this.startGame.bind(this)
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
            <TouchableOpacity onPress={this.startGame} style={style.startButton}>
              <Text style={{fontStyle: 'italic', fontSize: 32, color: base.colors.grey}}>play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )}

  startGame() {
    this.props.dispatch({type: 'scene:change', scene: 'Game'})
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

export default connect()(Start)
