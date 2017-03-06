'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {
  ActivityIndicator,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
const { InAppUtils } = NativeModules;

export default class PayButton extends Component {
  static propTypes = {
    pause:    PropTypes.func.isRequired,
    resume:   PropTypes.func.isRequired,
    continue: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.pay = this.pay.bind(this)
    this.state = {
      title: 'continue?',
      priceString: '99¢',
    }
  }

  componentDidMount() {
    const products = [
      'com.superserious.eggpeg.continue'
    ];
    InAppUtils.loadProducts(products, (err, products) => {
      if( err ) { return console.error(err) }
      if( !products.length ) { return console.error('No products returned for in app purchase') }
      this.setState({
        priceString: products[0].priceString,
        loaded: true,
      })
    })
  }

  render() { return (
    <View>
      { this.state.purchasing ?
        <ActivityIndicator />
      :
        <TouchableOpacity onPress={this.pay}>
          <Text style={style.continue}>continue?</Text>
        </TouchableOpacity>
      }
      <Text style={style.explanation}>keep playing for {this.state.priceString}</Text>
    </View>
  )}

  pay() {
    this.setState({
      purchasing: true,
    })
    this.props.pause()
    if( !this.state.loaded ) {
      return setTimeout(this.pay, 200);
    }

    InAppUtils.purchaseProduct('com.superserious.eggpeg.continue', (error, response) => {
      if( error ) {
        alert(error.message || JSON.stringify(error));
        this.setState({purchasing: false})
        this.props.resume()
        return
      }

      if(response && response.productIdentifier) {
        this.setState({purchasing: false})
        this.props.continue()
        console.log('Purchase Successful. Your Transaction ID is ' + response.transactionIdentifier);
      } else {
        alert('Invalid response', JSON.stringify(response))
        this.setState({purchasing: false})
        this.props.resume()
      }
    })
  }
}

const style = StyleSheet.create({
  explanation: {
    color: 'white',
  },
  continue: {
    fontSize:      32,
    color:         'white',
    paddingTop:    14,
    paddingBottom: 20,
    paddingLeft:   31,
    paddingRight:  31,
    borderColor:   'white',
    borderWidth:   1,
    borderRadius:  5,
    marginTop:     16,
    marginBottom:  10,
  },
})
