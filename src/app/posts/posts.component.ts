import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from "./models/post";
import { Subscription } from "rxjs";
import { PostService } from "./post.service";
import { LoadingService } from "../shared/services/loading.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  loading$ = this._loader.loading$;
  posts: Post[] = [];
  private _postsSub!: Subscription;

  constructor(private _postService: PostService,
              private _loader: LoadingService) {
  }

  ngOnInit(): void {
    this._postService.getPosts();
    this._postsSub = this._postService.getPostUpdateListener()
        .subscribe((posts:Post[])=> {
          this.posts = posts;
        })
  }

  ngOnDestroy() {
    this._postsSub.unsubscribe();
  }

}
