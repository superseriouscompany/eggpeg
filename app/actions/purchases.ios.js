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
