import { Component, Input, OnInit } from '@angular/core';
import { Post } from "../../interfaces";
import { TransferPostService } from "../../services/transfer-post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public particular_post!: Post;
  @Input() public openButtonIsVisible!: boolean;
  constructor(private _transferPostService: TransferPostService) { }

  ngOnInit(): void {
  }

  saveSelectedPost(selectedPost: Post) {
    this._transferPostService.post = selectedPost;
  }

}
