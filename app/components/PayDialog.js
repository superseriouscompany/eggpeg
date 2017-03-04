'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
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
    <View>
      <TouchableOpacity onPress={this.props.back}>
        <Text>&times;</Text>
      </TouchableOpacity>
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <TouchableOpacity onPress={this.purchase}>
        <Text>Lose {product.priceString}</Text>
      </TouchableOpacity>
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

})
