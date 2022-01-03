import { Component, Input, OnInit } from '@angular/core';
import { Post } from "../models/post";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post!: Post;
  @Input() public openButtonIsVisible!: boolean;
  currentUserLiked = true;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
  }

  onOpenPost(selectedPost: Post) {
    this._postService.post = selectedPost;
  }

  onToggleLike() {
    this.currentUserLiked = !this.currentUserLiked;
  }

}
