import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { switchMap, map} from 'rxjs/operators/';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HelpService } from 'src/app/help/help.service';
import { EHelpActions, AddQuery, QueryAddedSuccessfully } from '../actions/help.actions';
import { HelpQuery } from 'src/app/shared/models/help-query.model';

@Injectable()
export class HelpEffects {

    @Effect()
    addQuery$ = this.actions$.pipe(
        ofType<AddQuery>(EHelpActions.AddQuery),
        map(action => action.query),
        switchMap((query) => this.helpService.addQuery(query)),
        switchMap((query: HelpQuery) => of(new QueryAddedSuccessfully(query)))
    );


    constructor(
        private actions$: Actions,
        private _store: Store<AppState>,
        private helpService: HelpService,
        private authServie: AuthService
    ) {

    }
}
