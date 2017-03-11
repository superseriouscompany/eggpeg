export default function(state = {}, action) {
  switch(action.type) {
    case 'purchase:loadProducts':
      return {
        ...state,
        products: action.products,
      }
    default:
      return state
  }
}
