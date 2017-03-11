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
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    });
  }
}

export function purchase(identifier, cb) {
  return InAppBilling.open().then(() => {
    alert('purchasing')
    return InAppBilling.purchase(identifier);
  }).then((details) => {
    alert('consuming')
    purchaseToken = details.purchaseToken;
    return InAppBilling.consumePurchase(identifier);
  }).then(() => {
    alert('done')
    cb(null, true)
    InAppBilling.close()
  }).catch((err) => {
    alert('caught shit')
    console.error(err)
    cb(err);
  })
}
