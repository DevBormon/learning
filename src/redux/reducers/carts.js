import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from '../constants/action-types';

const initialState = {
    products: [],
};
const carts = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case REMOVE_FROM_CART:
            console.log(typeof action.payload.id);
            return {
                ...state,
                products: state.products.filter(product => product.id !== parseInt(action.payload.id)),
            };
        case EMPTY_CART:
            return {
                ...state,
                products: [],
            };
        default:
            return state;
    }
};

export default carts;
