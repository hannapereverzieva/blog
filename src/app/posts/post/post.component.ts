import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public post!: Post;
  @Input() public openButtonIsVisible!: boolean;
  @Input() public userIsAuth!: boolean;
  @Input() public  userId!: string | null;
  @Input() private _postsPerPage!: number;
  @Input() private _pageSizeOptions!: number;
  currentUserLiked = true;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {}

  onToggleLike() {
    if(this.userIsAuth) {
      this.currentUserLiked = !this.currentUserLiked;
    }
  }

  onDeletePost(id: any) {
    this._postService.deletePost(id).subscribe(() => {
      this._postService.getPosts(this._postsPerPage, this._pageSizeOptions);
    })
  }
}
