import { NativeModules } from 'react-native'

const { InAppUtils } = NativeModules;

export function loadProducts(cb) {
  return function(dispatch) {
    const products = [
      'com.superserious.eggpeg.continue4',
      'com.superserious.eggpeg.continue50',
      'com.superserious.eggpeg.continue5000',
    ];

    InAppUtils.loadProducts(products, function(err, products) {
      if( err ) { return cb(err); }
      if( !products.length ) { return cb(new Error('No products returned for in app purchases')) }

      dispatch({type: 'purchase:loadProducts', products: products})
    })
  }
}

export function restorePurchases(cb) {
  InAppUtils.restorePurchases((err, response)=> {
    if( err ) { return cb(err); }
    if( !response.length ) {
      const err = new Error('No purchases found');
      err.name = 'NotFound'
      return cb(err)
    }

    const productIds = response.map((p) => {
      return p.productIdentifier
    })

    return cb(null, productIds)
  })
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
