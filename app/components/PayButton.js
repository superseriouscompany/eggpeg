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
          <Text style={style.continue}>continue?</Text>
        </TouchableOpacity>
      }
      { this.props.products && this.props.products.length > 0 ?
        <Text style={style.explanation}>keep playing for {this.props.products[0].priceString}</Text>
      : null
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