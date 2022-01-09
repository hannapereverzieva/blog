import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './models/post';
import { Subscription } from 'rxjs';
import { PostService } from './post.service';
import { LoadingService } from '../shared/services/loading.service';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  loading$ = this._loader.loading$;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5, 10];
  private _postsSub!: Subscription;

  constructor(private _postService: PostService, private _loader: LoadingService) {}

  ngOnInit(): void {
    this._postService.getPosts(this.postsPerPage, this.currentPage);
    this._postsSub = this._postService.getPostUpdateListener().subscribe((postData:{posts: Post[], postsCount: number}) => {
      this.totalPosts = postData.postsCount;
      this.posts = postData.posts;
    });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this._postsSub.unsubscribe();
  }
}
