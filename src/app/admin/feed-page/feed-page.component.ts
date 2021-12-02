import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/interfaces";
import {PostNewPostService} from "../shared/services/post-new-post.service";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {
  posts: Post[] = [
    {
      title: 'First Post',
      author: 'Hanna P',
      content: 'Hello there!',
      date: new Date()
    }
  ]
  constructor(private _postNewPostService: PostNewPostService) { }

  ngOnInit(): void {
    if (this._postNewPostService.post != undefined) {
      this.posts.unshift(this._postNewPostService.post);
    }
  }

}
