import { User } from '../../../shared/models/user.model';
import { Product } from 'src/app/shared/models/product.model';

export interface ProductState {
    products: Product[];
    selectedProduct: Product;
}

export const initialProductState: ProductState = {
    products: null,
    selectedProduct: null,
};

