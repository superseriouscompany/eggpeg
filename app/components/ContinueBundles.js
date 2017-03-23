'use strict';

import React      from 'react'
import Component  from './Component'
import Text       from './Text'
import {connect}  from 'react-redux'
import {purchase} from '../actions/purchases'
import {
  TouchableOpacity,
  View,
} from 'react-native';

class ContinueBundles extends Component {
  constructor(props) {
    super(props)
    this.state = { purchasing: false }
  }

  buy(productId) {
    if( this.state.purchasing ) { return; }
    this.setState({
      purchasing: true,
    })
    purchase(productId, (err, response) => {
      if( err ) {
        alert(err.message || JSON.stringify(err));
        console.error(err);
        this.setState({purchasing: false});
      }

      const count =
        productId == 'com.superserious.eggpeg.continue' ? 1 :
        productId == 'com.superserious.eggpeg.continue20' ? 20 :
        productId == 'com.superserious.eggpeg.continue1001' ? 1001 :
        null;

      if( !count ) {
        return alert('Oh no! Something went wrong on our end. Please contact help@superserious.co.')
      }

      this.props.dispatch({type: 'continues:add', pack: productId, count: count})
      alert('success!')
    })
  }

  render() { return (
    <View style={{padding: 80}}>
      { (this.props.products || []).map((p, key) => (
        <TouchableOpacity key={key} onPress={() => this.buy(p.identifier)}>
          <Text style={{marginBottom: 20}}>
            {p.priceString}&nbsp;
            {p.title}&nbsp;
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    products: (state.purchase.products || []).sort((a, b) => {
      return a.price < b.price ? -1 : 1
    }),
  }
}

export default connect(mapStateToProps)(ContinueBundles)
