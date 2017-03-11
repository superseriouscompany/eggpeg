export function loadProducts() {
  return function(dispatch) {
    const products = [{
      priceString: '$0.99'
    }]

    dispatch({type: 'purchase:loadProducts', products: products})
  }
}

export function purchase(identifier) {
  return alert('Not implemented on android')
}
