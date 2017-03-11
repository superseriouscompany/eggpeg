import InAppBilling from 'react-native-billing'

export function loadProducts() {
  return function(dispatch) {
    return InAppBilling.open().then(() => {
      return InAppBilling.getProductDetails('com.superserious.eggpeg.continue')
    }).then((p) => {
      dispatch({type: 'purchase:loadProducts', products: [{
        title: p.title.replace(' (Egg Peg)', ''),
        description: p.description,
        priceString: p.priceText,
      }]})
      return InAppBilling.close()
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    });
  }
}

export function purchase(identifier, cb) {
  return InAppBilling.open().then(() => {
    return InAppBilling.purchase(identifier);
  }).then((details) => {
    purchaseToken = details.purchaseToken;
    return InAppBilling.consumePurchase(identifier);
  }).then(() => {
    cb(null, true)
    return InAppBilling.close()
  }).catch((err) => {
    console.error(err)
    cb(err);
  })
}
