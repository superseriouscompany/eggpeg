'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  Image,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
const {InAppUtils} = NativeModules;

export default class PayDialog extends Component {
  static propTypes = {
    back:     PropTypes.func.isRequired,
    product:  PropTypes.shape({
      id:          PropTypes.string.isRequired,
      title:       PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priceString: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {product} = this.props;
  return (
    <View style={{flex: 1}}>
      <View style={style.header}>
        <TouchableOpacity style={{padding: 20, paddingTop: 12}} onPress={this.props.back}>
          <Text>&times;</Text>
        </TouchableOpacity>
      </View>
      <View style={style.main}>
        <Image style={{marginBottom: 10}} source={require('../images/CartoonBabies.png')} />

        <View>
          <Text>{product.title}</Text>
          <Text>{product.description}</Text>
        </View>

        <TouchableOpacity onPress={this.purchase}>
          <Text>Lose {product.priceString}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

  purchase() {
    InAppUtils.purchaseProduct('com.superserious.sniper.donate', (error, response) => {
      if( error ) { return console.error(error); }

      if(response && response.productIdentifier) {
        alert('Purchase Successful. Your Transaction ID is ' + response.transactionIdentifier);
      } else {
        console.error('Invalid response', JSON.stringify(response))
      }
    })
  }
}

const style = StyleSheet.create({
  header: {
    zIndex: 69,
  },
  main: {
    marginTop: -55,
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
