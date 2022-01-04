import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post!: Post;
  private _postId!: string;
  constructor(private _postService: PostService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      this._postId = paramMap.get('id') as string;
      this._postService.getPost(this._postId).subscribe(postData => {
        if (postData) {
          this.post = {
            id: postData._id,
            title: postData.title,
            author: postData.author,
            content: postData.content,
            date: postData.date,
            likes: []
          }
        }
      });
    })
  }
}
