'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import InAppBilling from 'react-native-billing'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PayButton extends Component {
  constructor(props) {
    super(props)
    this.pay = this.pay.bind(this)
  }

  render() { return (
    <TouchableOpacity style={style.pay} onPress={this.pay}>
      <Text style={{fontStyle: 'italic'}}>we po&#39;</Text>
    </TouchableOpacity>
  )}

  pay() {
    InAppBilling.open().then(() => {
      return InAppBilling.purchase('android.test.purchased')
    }).then((details) => {
      console.log("You purchased: ", details)
      return InAppBilling.close()
    }).catch((err) => {
      console.error(err);
    });
  }
}

const style = StyleSheet.create({
  pay: {
    position: 'absolute',
    right: 0,
  },
})
