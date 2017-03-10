import { NativeModules } from 'react-native'

const { InAppUtils } = NativeModules;

export function loadProducts(cb) {
  return function(dispatch) {
    const products = [
      'com.superserious.eggpeg.continue'
    ];

    InAppUtils.loadProducts(products, (err, products) => {
      if( err ) { return alert(err.message || JSON.stringify(err)) }
      if( !products.length ) { return alert('No products returned for in app purchases') }

      dispatch({type: 'purchase:loadProducts', products: products})
    })
  }
}

export function purchase(identifier, cb) {
  InAppUtils.purchaseProduct(identifier, (err, response) => {
    if( err ) { return cb(err); }
    if(!response || !response.productIdentifier) {
      return cb(new Error('Invalid response: ' + JSON.stringify(response)));
    }

    console.log('Purchase successful.', response.transactionIdentifier);
    return cb(null, response.transactionIdentifier);
  })
}
