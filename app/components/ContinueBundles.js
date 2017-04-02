'use strict';

import React                        from 'react'
import Component                    from './Component'
import Text                         from './Text'
import {connect}                    from 'react-redux'
import {purchase, restorePurchases} from '../actions/purchases'
import {
  TouchableOpacity,
  View,
} from 'react-native';

class ContinueBundles extends Component {
  constructor(props) {
    super(props)
    this.state = { purchasing: false }
    this.restorePurchases = this.restorePurchases.bind(this)
    this.processPurchase  = this.processPurchase.bind(this)
  }

  processPurchase(productId) {
    const count =
      productId == 'com.superserious.eggpeg.continue4' ? 4 :
      productId == 'com.superserious.eggpeg.continue50' ? 50 :
      productId == 'com.superserious.eggpeg.continue5000' ? 5000 :
      null;

    if( !count ) {
      return alert('Oh no! Something went wrong on our end. Please contact help@superserious.co.')
    }

    this.props.dispatch({type: 'continues:add', pack: productId, count: count})
  }

  restorePurchases() {
    restorePurchases((err, productIds) => {
      if( err ) {
        if( err.name === 'NotFound' ) {
          return alert('No purchases found.');
        }
        return alert(err.message || JSON.stringify(err));
      }
      productIds.forEach((pid) => {
        this.processPurchase(pid)
      })
      alert('Restored purchases.')
    })
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
        return
      }

      this.processPurchase(productId)
      this.props.dispatch({type: 'scene:pop'})

    })
  }

  render() { return (
    <View style={{padding: 80}}>
      { (this.props.products || []).map((p, key) => (
        <TouchableOpacity key={key} onPress={() => this.buy(p.identifier)}>
          <Text style={{marginBottom: 20}}>
            { p.identifier === 'com.superserious.eggpeg.continue4' ?
              `4 for ${p.priceString}`
            : p.identifier === 'com.superserious.eggpeg.continue5000' ?
              `5,000! ${p.priceString}`
            :
              `${p.title} for ${p.priceString}`
            }
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={this.restorePurchases}>
        <Text>Restore Purchases</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.dispatch({type: 'scene:pop'})}>
        <Text>Back</Text>
      </TouchableOpacity>
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
