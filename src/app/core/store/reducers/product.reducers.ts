import { ProductActions, EProductActions } from '../actions/product.actions';
import { initialProductState, ProductState } from '../state/product.state';

export function productReducers(
    state = initialProductState,
    action: ProductActions
): ProductState {
    switch (action.type) {
        case EProductActions.AddPrdouct:
            return {
                ...state,
                selectedProduct: action.product
            };

        case EProductActions.ProductAdded:
            return {
                ...state,
                selectedProduct: action.product
            };

        // case EUserActions.SetLoggedInUser:
        //     return {
        //         ...state,
        //         loggedInUser: action.payload
        //     };

        default:
            return state;
    }
};