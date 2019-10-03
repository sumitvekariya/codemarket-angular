import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { GetPostsByUserIdAndType, GetPostsByType, DeletePost } from 'src/app/core/store/actions/post.actions';
import { selectPostsByUserIdAndType, selectPostsByType } from 'src/app/core/store/selectors/post.selectors';
import { PostService } from 'src/app/shared/services/post.service';
import { BreadCumb } from '../../shared/models/bredcumb.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  expandedPost: Post | null;
  all: boolean;
  authorId: string;
  breadcumb: BreadCumb;


  userSubsription: Subscription;
  postsListSubscription: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    public postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.all = JSON.parse(this.activatedRoute.snapshot.queryParams.all);

    const type: string = this.activatedRoute.snapshot.queryParams.type;
    this.breadcumb = {
      title: 'List of ' + _.startCase(type),
      path: [
        {
          name: 'Dashboard',
          pathString: '/',
        },
        {
          name: type
        }
      ]
    };

    if (this.all) {
      this.displayedColumns = ['number', 'name', 'price', 'user', 'category', 'date'];
      this.postsListSubscription = this.store.select(selectPostsByType).pipe(
        map((posts) => {
          if (posts) {
            this.dataSource.data = posts;
          }
        })
      ).subscribe();
      this.store.dispatch(GetPostsByType({postType: type}));
    } else {

      /** Checking if authorId is there to see if user is trying to visit somebody else's
       * profile or his own profile(loggedin User's own Profile)
      **/

      this.authorId = this.activatedRoute.parent.snapshot.parent.params['authorId'];

      if (this.authorId) {
        this.store.dispatch(GetPostsByUserIdAndType({ userId: this.authorId, status: '', postType: type }));
        this.displayedColumns = ['number', 'name', 'price'];
      } else {
        this.store.dispatch(GetPostsByUserIdAndType({ userId: this.authService.loggedInUser._id, status: '', postType: type }));
        this.displayedColumns = ['number', 'name', 'price', 'status', 'action'];
      }

      this.postsListSubscription = this.store.select(selectPostsByUserIdAndType).pipe(
        map((posts) => {
          if (posts) {
            this.dataSource.data = posts;
          }
        })
      ).subscribe();
    }

    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.postsListSubscription) {
      this.postsListSubscription.unsubscribe();
    }

    if (this.userSubsription) {
      this.postsListSubscription.unsubscribe();
    }
  }


  editPost(post): void {
    // this.store.dispatch(SetSelectedPost({post}));
    // this.router.navigate(['/add-post'], );
  }

  deletePost(postId: string) {
    this.store.dispatch(DeletePost({ postId }));
  }

}
