import { NativeModules } from 'react-native'

const { InAppUtils } = NativeModules;

export function loadProducts(cb) {
  const products = [
    'com.superserious.eggpeg.continue'
  ];
  InAppUtils.loadProducts(products, (err, products) => {
    if( err ) { return cb(err) }
    if( !products.length ) { return cb(new Error('No products returned for in app purchase')) }
    return cb(null, products);
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
