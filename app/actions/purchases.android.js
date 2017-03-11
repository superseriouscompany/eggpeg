import InAppBilling from 'react-native-billing'

export function loadProducts() {
  return function(dispatch) {
    InAppBilling.getProductDetails('com.superserious.eggpeg.continue').then((p) => {
      dispatch({type: 'purchase:loadProducts', products: [{
        title: p.title,
        description: p.description,
        priceString: p.priceText,
        currency: p.currency,
      }]})
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    });
  }
}

export function purchase(identifier, cb) {
  return function(dispatch) {
    InAppBilling.open().then(() => {
      return InAppBilling.purchase(identifier);
    }).then((details) => {
      purchaseToken = details.purchaseToken;
      return InAppBilling.consumePurchase(identifier);
    }).then(() => {
      cb(null, true)
      InAppBilling.close()
    }).catch((err) => {
      cb(err);
    })
  }
}
