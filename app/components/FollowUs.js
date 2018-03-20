'use strict';

import React     from 'react';
import Component from './Component';
import Text      from './Text';
import {connect} from 'react-redux'
import {
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class FollowUs extends Component {
  constructor(props) {
    super(props)
    this.visitGram = this.visitGram.bind(this)
    this.visitSite = this.visitSite.bind(this)
    this.back = this.back.bind(this)
  }

  render() { return (
    <View style={{flex: 1}}>
      <StatusBar hidden/>

      <View style={style.header}>
        <TouchableOpacity style={style.leftNav} onPress={this.back}>
          <Text style={{fontStyle: 'italic'}}>back</Text>
        </TouchableOpacity>
      </View>
      <View style={style.main}>
        <Image style={{marginBottom: 10}} source={require('../images/CartoonBabies.png')} />

        <TouchableOpacity onPress={this.visitGram}>
          <Image source={require('../images/IGFollowButton.png')} />
        </TouchableOpacity>
      </View>

      <View style={style.footer}>
        <TouchableOpacity style={style.creditsCnr} onPress={() => Linking.openURL('http://marcdolgin.com')}>
          <Text style={style.credits}>marc dolgin (music + sfx)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.visitSite}>
          <Text style={{fontStyle: 'italic'}}>superseriouscompany.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

  back() {
    this.props.dispatch({type: 'scene:pop'})
  }

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
    padding: 20,
  },
  main: {
    marginTop: -60,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditsCnr: {
    marginBottom: 10,
  },
  credits: {
    fontStyle: 'italic'
  },
  footer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    alignItems: 'center',
  }
})

export default connect()(FollowUs)
