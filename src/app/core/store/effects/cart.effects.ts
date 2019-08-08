import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { map, withLatestFrom, tap, pairwise, combineAll, switchMap} from 'rxjs/operators/';
import { AuthService } from 'src/app/core/services/auth.service';
import { HelpService } from 'src/app/help/help.service';
import { ECartActions, AddToCart, GetCartProductsList, UpdateCartProductList, RemoveProductFromCart, UpdateCartTotal, UpdateCartTotalSuccess } from '../actions/cart.actions';
import { selectAllProductsList } from '../selectors/product.selectors';
import { Product } from 'src/app/shared/models/product.model';
import { UpdatePrdouct } from '../actions/product.actions';
import { of } from 'rxjs';
import { selectCartProductList } from '../selectors/cart.selectors';

@Injectable()
export class CartEffects {

    @Effect()
    addProductToCart$ = this.actions$.pipe(
        ofType<AddToCart>(ECartActions.AddToCart),
        map(action => action.productId),
        withLatestFrom(this._store.select(selectCartProductList)),
        switchMap(([id, products]) => {
            const i = products.length ? products.findIndex(prod => prod === id) : -1;
            // products[i].addedToCart = true;
            if (i < 0) {
                products.push(id);
            }
            return of(products);
        }),
        tap(t => console.log(t)),
        switchMap((productIds: string[]) => [new UpdateCartProductList(productIds), new UpdateCartTotal()])
    );

    @Effect()
    updateCartTotal$ = this.actions$.pipe(
        ofType<UpdateCartTotal>(ECartActions.UpdateCartTotal),
        switchMap(() => this._store.select(selectCartProductList)),
        withLatestFrom(this._store.select(selectAllProductsList)),
        switchMap(([ids, allProducts]) => {
            let total = 0;
            ids.forEach((id) => {
                total += allProducts.find(i => i._id === id).totalPrice;
            });
            return of(total);
        }),
        map((total: number) => {
            return new UpdateCartTotalSuccess(total, total);
        })
    )

    @Effect()
    removeProductFromCart$ = this.actions$.pipe(
        ofType<RemoveProductFromCart>(ECartActions.RemoveProductFromCart),
        map(action => action.productId),
        withLatestFrom(this._store.select(selectCartProductList)),
        switchMap(([id, [...products]]) => {
            const i = products.length ? products.findIndex(prod => prod === id) : -1;
            if (i > -1) {
                products.splice(i, 1);
            }
            return of(products);
        }),
        tap(t => console.log(t)),
        switchMap((productIds: string[]) => of(new UpdateCartProductList(productIds), new UpdateCartTotal()))
    );


    // @Effect()
    // getCartProductsList$ = this.actions$.pipe(
    //     ofType<GetCartProductsList>(ECartActions.GetCartProductsList),
    //     switchMap(() => this._store.select(selectAllProductsList)),
    //     map((productsList) => {
    //         return productsList.filter(p => p.addedToCart);
    //     }),
    //     map((productsList) => new UpdateCartProductList(productsList))
    // );


    constructor(
        private actions$: Actions,
        private _store: Store<AppState>,
        private helpService: HelpService,
        private authServie: AuthService
    ) {

    }
}
