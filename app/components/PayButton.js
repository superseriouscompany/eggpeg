'use strict';

import React, {PropTypes} from 'react';
import Component          from './Component';
import Text               from './Text';
import {connect}          from 'react-redux'
import {purchase}         from '../actions/purchases'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class PayButton extends Component {
  static propTypes = {
    continue:  PropTypes.func.isRequired,
    products:  PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.pay = this.pay.bind(this)
    this.state = { purchasing: false }
  }

  render() { return (
    <TouchableOpacity style={[...this.props.style]} onPress={this.pay}>
      { this.state.purchasing ?
        <ActivityIndicator />
      :
        <Text style={[this.props.textStyle]}>continue</Text>
      }
    </TouchableOpacity>
  )}

  pay() {
    if( this.state.purchasing ) { return; }
    this.setState({
      purchasing: true,
    })
    purchase('com.superserious.eggpeg.continue', (err, ok) => {
      if( err ) {
        alert(err.message || JSON.stringify(err));
        this.setState({purchasing: false})
        return
      }

      this.setState({purchasing: false})
      this.props.continue()
    })
  }
}

function mapStateToProps(state) {
  return {
    products: state.purchase.products || [],
  }
}

export default connect(mapStateToProps)(PayButton)
