'use strict';

import React                        from 'react'
import Component                    from './Component'
import ContinueBundlesView          from '../views/ContinueBundlesView'
import {connect}                    from 'react-redux'
import {purchase, restorePurchases} from '../actions/purchases'

class ContinueBundles extends Component {
  constructor(props) {
    super(props)
    this.state = { purchasing: false }
    this.restorePurchases = this.restorePurchases.bind(this)
    this.processPurchase  = this.processPurchase.bind(this)
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
      alert(`Restored ${productIds.length} purchases.`)
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

  render() { return (
    <ContinueBundlesView {...this.props} buy={this.buy} restorePurchases={this.restorePurchases} />
  )}
}

function mapStateToProps(state) {
  return {
    products: (state.purchase.products || []).sort((a, b) => {
      return a.price < b.price ? -1 : 1
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    back: () => {
      dispatch({type: 'scene:pop'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContinueBundles)
