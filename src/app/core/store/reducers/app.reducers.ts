import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
// import { routerReducer } from '@ngrx/router-store';
import { userReducers } from './user.reducers';
import { postReducers } from './post.reducers';

export function appReducesrs(): ActionReducerMap<AppState, any> {
    return {
        // router: routerReducer,
        users: userReducers,
        post: postReducers
    };
}

