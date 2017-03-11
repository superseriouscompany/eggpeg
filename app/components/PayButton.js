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
    pause:     PropTypes.func.isRequired,
    resume:    PropTypes.func.isRequired,
    continue:  PropTypes.func.isRequired,
    products:  PropTypes.array.isRequired,
    countdown: PropTypes.number.isRequired,
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
        <TouchableOpacity style={this.props.style} onPress={this.pay}>
            <Text style={{fontStyle: 'italic', fontSize: 32, color: 'white'}}>
              buy a life
            </Text>
            <Text style={style.countdown}>
              {this.props.countdown}
            </Text>
            { this.props.products && this.props.products.length ?
              <Text style={style.priceString}>
                {this.props.products[0].priceString}
              </Text>
            : null }
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
    products: state.purchase.products || [],
  }
}

export default connect(mapStateToProps)(PayButton)

const style = StyleSheet.create({
  explanation: {
    color: 'white',
  },
  countdown: {
    color: 'white',
    position: 'absolute',
    top: 5,
    right: 7,
    fontSize: 12,
  },
  priceString: {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    right: 7,
    fontSize: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: 200,
    height: 75,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
