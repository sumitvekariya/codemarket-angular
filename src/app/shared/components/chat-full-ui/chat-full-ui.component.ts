import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import * as Chat from 'twilio-chat';
import moment from 'moment';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { environment } from '../../../../environments/environment';
import { PostService } from '../../services/post.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Post } from '../../models/post.model';
import { throttleTime, mergeMap, scan, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-full-ui',
  templateUrl: './chat-full-ui.component.html',
  styleUrls: ['./chat-full-ui.component.scss']
})
export class ChatFullUiComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  listOfConnectedPosts: { posts: Post[], total?: number } = { posts: [] };
  totalConnectedPosts: number;


  @Input() postList = [];
  @Input() loggedInUser;
  @ViewChild('scrollMe', { static: false }) scrollMe: ElementRef;

  public commentsList = [];
  public selectedPost;
  public anonymousAvatar = '../../assets/images/anonymous-avatar.jpg';
  public username = '';
  public chatToken = '';
  public channelName = '';
  public channelStatus = '';
  public chatClient: any;
  public generalChannel: any;
  public msg: any;
  public loadingMessage = '';
  public loginUser;
  scrolltop: number = null;
  s3FilesBucketURL = environment.s3FilesBucketURL;
  constructor(
    private _chatService: ChatService,
    public postService: PostService
  ) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap((n) => this.getBatch(n)),
      scan((acc, batch: any) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  ngOnInit() {
    // this.username = `${this.loggedInUser.name}_${this.loggedInUser._id}`;
    this.postList.map((post, i) => { post.isActive = false, post.count = 0, post.indexAt = i, post.lastMessage = '', post.dateTime = new Date(); });
    // this.createTwilioToken();
  }


  getBatch(offset) {
    console.log(offset);
    return this.postService.getAllPosts(
      {
        pageNumber: offset + 1, limit: 10,
        sort: { order: '' }
      }, '', '', '',
      this.loggedInUser._id
    ).pipe(
      tap((arr) => (arr.posts.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.posts.reduce((acc, cur) => {
          const id = cur._id;
          const data = cur;
          return { ...acc, [id]: data };
        }, {});
      })
    );
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  openPostChat(index: number) {
  }

  createTwilioToken() {

  }

  createOrJoinGeneralChannel(channel_id) {
  }

  setupChannel() {
  }

  sendMsg() {
  }

  getFormatedDate(datetime) {
    if (moment().format('DD MMM YYYY') === moment(datetime).format('DD MMM YYYY')) {
      return moment(datetime).format('hh:mm A');
    } else {
      return moment(datetime).format('hh:mm A') + ' ' + moment(datetime).format('DD MMM YYYY');
    }
  }

  trackByIdx(i) {
    return i;
  }

}
