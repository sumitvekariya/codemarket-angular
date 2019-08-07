import { Component, OnInit } from '@angular/core';
import { BreadCumb } from '../shared/models/bredcumb.model';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/state/app.state';
import { ProductService } from '../core/services/product.service';
import { RemoveProductFromCart } from '../core/store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  breadcumb: BreadCumb;
  cartProductsList: Observable<string[]>;

  constructor(
    public store: Store<AppState>,
    public productService: ProductService
  ) {

    this.cartProductsList = this.productService.cartProductListIds;
    this.breadcumb = {
      title: 'Amazing Products in Your Cart',
      path: [
        {
          name: 'Dashboard'
        },
        {
          name: 'Cart'
        }
      ]
    };
  }

  ngOnInit() {
  }

  removeProductFromCart(productId): void {
    this.store.dispatch(new RemoveProductFromCart(productId));
  }

}
