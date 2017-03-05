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
    <TouchableOpacity style={style.rightNav} onPress={this.pay}>
      <Text style={{fontStyle: 'italic'}}>$$$</Text>
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
  rightNav: {
    width: 120,
    padding: 20,
    paddingTop: 18,
    paddingLeft: 0
  },
})
