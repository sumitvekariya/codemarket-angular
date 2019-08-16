import { Action, createAction, props } from '@ngrx/store';
import { HelpQuery } from 'src/app/shared/models/help-query.model';

export enum EHelpRequestActions {
    AddQuery = '[Help] Add Query',
    QueryAddedSuccessfully = '[Help] Query Added Successfully',

    GetAllHelpRequests = '[HelpRequest] Get All HelpRequests', // List of All HelpRequests in the platform
    GetHelpRequestsByUserId = '[HelpRequest] Get HelpRequests By User Id',
    GetHelpRequestById = '[HelpRequest] Get HelpRequest By Id',
    HelpRequestList = '[HelpRequest] HelpRequestList', // List of HelpRequests Created by LoggedIn User

    SetAllHelpRequestsList = '[HelpRequest] Set All HelpRequests List', // Set the List of All HelpRequests within the platform
    SetSelectedHelpRequest = '[HelpRequest] Select HelpRequest'

}

export const AddQuery = createAction(
    EHelpRequestActions.AddQuery,
    props<{query: HelpQuery}>()
);

export const QueryAddedSuccessfully = createAction(
    EHelpRequestActions.QueryAddedSuccessfully,
    props<{query: HelpQuery}>()
);


export const GetHelpRequestsByUserId = createAction(
    EHelpRequestActions.GetHelpRequestsByUserId
);

export const GetHelpRequestById = createAction(
    EHelpRequestActions.GetHelpRequestById,
    props<{helpRequestId: string}>()
);

export const HelpRequestList = createAction(
    EHelpRequestActions.HelpRequestList,
    props<{helpRequest: HelpQuery[]}>()
);

export const SetSelectedHelpRequest = createAction(
    EHelpRequestActions.SetSelectedHelpRequest,
    props<{helpRequest: HelpQuery}>()
);

export const GetAllHelpRequests = createAction(
    EHelpRequestActions.GetAllHelpRequests
);

export const SetAllHelpRequestsList = createAction(
    EHelpRequestActions.SetAllHelpRequestsList,
    props<{helpRequest: HelpQuery[]}>()
);

