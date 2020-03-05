import axios from 'axios'

let currentCart = []
if (localStorage.getItem('cart')) {
  currentCart = JSON.parse(localStorage.getItem('cart'))
} else {
  currentCart = []
}

// initial state
const initialState = {
  cart: currentCart
}

//cartItem: {id: quantity}

// action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// action creators
export const getCart = cart => ({type: GET_CART, cart})
export const addCartItem = id => ({type: ADD_TO_CART, id})

//action.id
//action.quantity

// thunk creators
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// sub-reducer
export default function(state = initialState, action) {
  let items
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      items = state.cart
      if (action.id in items) {
        items[action.id]++
      } else {
        items[action.id] = 1
      }
      localStorage.setItem('cart', JSON.stringify(items))
      // history.push('/cart')
      return items
    default:
      return state
  }
}
