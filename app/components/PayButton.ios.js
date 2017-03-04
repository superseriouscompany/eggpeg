'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
const { InAppUtils } = NativeModules;

export default class PayButton extends Component {
  constructor(props) {
    super(props)
    this.pay = this.pay.bind(this)
  }

  render() { return (
    <TouchableOpacity style={style.rightNav} onPress={this.pay}>
      <Text style={{fontStyle: 'italic', textAlign: 'right'}}>we po&#39;</Text>
    </TouchableOpacity>
  )}

  pay() {
    const products = [
      'com.superserious.sniper.donate'
    ];
    InAppUtils.loadProducts(products, (err, products) => {
      if( err ) { return console.error(err) }
      if( !products.length ) { return console.error('No products returned for in app purchase') }
      this.props.payDialog(products[0].identifier, products[0].title, products[0].description, products[0].priceString)
    })
  }
}

const style = StyleSheet.create({
  rightNav: {
    width: 120,
    padding: 20,
    paddingTop: 18,
    paddingLeft: 0
  },
})
