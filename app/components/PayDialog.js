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
        <TouchableOpacity style={style.leftNav} onPress={this.props.back}>
          <Text>&times;</Text>
        </TouchableOpacity>
      </View>
      <View style={style.main}>
        <Image style={{marginBottom: 10}} source={require('../images/CartoonBabies.png')} />

        <View>
          <Text style={{fontSize: 32, textAlign: 'center', marginBottom: 5}}>{product.title}</Text>
          <Text style={{fontSize: 14, textAlign: 'center'}}>{product.description}</Text>
        </View>

        <TouchableOpacity style={style.paymentButton} onPress={this.purchase}>
          <Text style={{color: 'white', textAlign: 'center'}}>Lose {product.priceString}</Text>
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
  paymentButton: {
    backgroundColor: '#9EB392',
    width: 264,
    height: 69,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
