export default function(state = {}, action) {
  switch(action.type) {
    case 'purchase:loadProducts':
      console.warn('getting products', action.products)
      return {
        ...state,
        products: action.products,
      }
    default:
      return state
  }
}
