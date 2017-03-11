'use strict';

import React, {PropTypes} from 'react';
import Component from './Component';
import Text from './Text';
import {connect} from 'react-redux'
import {purchase} from '../actions/purchases'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class PayButton extends Component {
  static propTypes = {
    pause:    PropTypes.func.isRequired,
    resume:   PropTypes.func.isRequired,
    continue: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.pay = this.pay.bind(this)
    this.state = { purchasing: false }
  }

  render() { return (
    <View>
      { this.state.purchasing ?
        <ActivityIndicator />
      :
        <TouchableOpacity onPress={this.pay}>
          <Text style={this.props.style}>continue?</Text>
        </TouchableOpacity>
      }
    </View>
  )}

  pay() {
    this.setState({
      purchasing: true,
    })
    this.props.pause()

    purchase('com.superserious.eggpeg.continue', (err, ok) => {
      if( err ) {
        alert(err.message || JSON.stringify(err));
        this.setState({purchasing: false})
        this.props.resume()
        return
      }

      this.setState({purchasing: false})
      this.props.continue()
    })
  }
}

function mapStateToProps(state) {
  return {
    products: state.purchase.products,
  }
}

export default connect(mapStateToProps)(PayButton)

const style = StyleSheet.create({
  explanation: {
    color: 'white',
  },
})
