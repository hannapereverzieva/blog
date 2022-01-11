import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './models/post';
import { Subscription } from 'rxjs';
import { PostService } from './post.service';
import { LoadingService } from '../shared/services/loading.service';
import { PageEvent } from "@angular/material/paginator";
import { Tag } from "./models/tag";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  loading$ = this._loader.loading$;
  posts: Post[] = [];
  tags: string[] = [];
  totalPosts = 0;
  postsPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5, 10];
  private _postsSub!: Subscription;
  private _tagsSub!: Subscription;

  constructor(private _postService: PostService, private _loader: LoadingService) {}

  ngOnInit(): void {
    this._postService.getPosts(this.postsPerPage, this.currentPage);
    this._postsSub = this._postService.getPostUpdateListener().subscribe((postData:{posts: Post[], postsCount: number}) => {
      this.totalPosts = postData.postsCount;
      this.posts = postData.posts;
    });
    this._postService.getTags();
    this._tagsSub = this._postService.getTagUpdateListener().subscribe((tagData:any) => {
      //@ts-ignore
      this.tags = [...new Set(tagData.map(tag => tag['name']))];
    })
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this._postsSub.unsubscribe();
    this._tagsSub.unsubscribe();
  }
}
