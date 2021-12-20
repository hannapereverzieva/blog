import { Component, OnInit } from '@angular/core';
import { Post } from "../models/post";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public single_post!: Post;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this.single_post = this._postService.post;
  }

}