import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { selectSelectedProduct } from 'src/app/core/store/selectors/product.selectors';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GetProductById } from 'src/app/core/store/actions/product.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // modules for quill view component
  modules = {
    formula: true,
    // imageResize: {},
    syntax: true,
  };


  productDetails$: Observable<Product>;
  subscription$: Subscription;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productDetails$ = this.store.select(selectSelectedProduct);

    this.subscription$ = this.store.select(selectSelectedProduct).pipe(
      tap((p: Product) => {
        if (p) {
          this.productDetails$ = of(p);
        } else {
          const params = this.activatedRoute.snapshot.params;
          if (params['productId']) {
          this.store.dispatch(new GetProductById(params.productId));
          }
        }

      })
    ).subscribe();
  }

  getDate(d: string) {
    return new Date(+d);
  }

}
