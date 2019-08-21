import { Injectable } from '@angular/core';
import { Interview } from '../shared/models/interview.model';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { description } from '../shared/constants/fragments_constatnts';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interviewQueryFields = gql`
  fragment Interview on Interview {
    _id
    name
    categories
    description {
      ...Description
    }
    shortDescription
    demo_url
    price
    status
    createdAt
    updatedAt
    tags {
      name
    }
  }
  ${description}
  `;

  constructor(
    private apollo: Apollo,
    private auth: AuthService
  ) { }


  getInterviewsByUserId(): Observable<Interview[]> {
    return this.apollo.query(
      {
        query: gql`
          query getInterviewsByUserId($userId: String) {
            getInterviewsByUserId(userId: $userId) {
              ...Interview
            }
          }
          ${this.interviewQueryFields}
        `,
        variables: {
          userId: this.auth.loggedInUser._id
        },
        fetchPolicy:  'no-cache'
      }
    ).pipe(
      map((p: any) => {
        return p.data.getInterviewsByUserId;
      }),
    );
  }


  getAllInterviews(): Observable<Interview[]> {
    return this.apollo.query(
      {
        query: gql`
          query getAllInterviews {
            getAllInterviews {
              ...Interview
            }
          }
          ${this.interviewQueryFields}
        `,
        fetchPolicy: 'no-cache'
      }
    ).pipe(
      map((p: any) => {
        return p.data.getAllInterviews;
      }),
    );
  }

  getInterviewById(InterviewId: string): Observable<Interview> {
    return this.apollo.query(
      {
        query: gql`
          query getInterviewById($InterviewId: String) {
            getInterviewById(interviewId: $InterviewId) {
              ...Interview
            }
          }
          ${this.interviewQueryFields}
        `,
        variables: {
          InterviewId: InterviewId
        }
      }
    ).pipe(
      map((p: any) => {
        return p.data.getInterviewById;
      }),
    );
  }


  addInterview(interview: Interview): Observable<Interview> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addInterview($interview: InterviewInput) {
          addInterview(interview: $interview) {
            ...Interview
          }
        }
        ${this.interviewQueryFields}
      `,
      variables: {
        interview: interview
      }
    }).pipe(
      map(q => q.data.addInterview)
    );
  }

  updateInterview(interview: Interview): Observable<Interview> {
    return this.apollo.mutate(
      {
        mutation: gql`
          mutation updateInterview($interview: InterviewInput) {
            updateInterview(interview: $interview) {
              ...Interview
            }
          }
          ${this.interviewQueryFields}
        `,
        variables: {
          interview: interview
        }
      }
    ).pipe(
      map((p) => p.data.updateInterview),
    );
  }

  deleteInterview(interviewId: string): Observable<boolean> {
    return this.apollo.mutate(
      {
        mutation: gql`
          mutation deleteInterview($interviewId: String) {
            deleteInterview(interviewId: $interviewId)
          }
        `,
        variables: {
          interviewId: interviewId
        }
      }
    ).pipe(
      map((p: any) => {
        return p.data.deleteInterview;
      }),
    );
  }
}
