import { Component, Input, OnInit } from '@angular/core';
import { Post } from "../../../admin/shared/interfaces";
import { TransferPostService } from "../../services/transfer-post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public particular_post!: Post;
  constructor(private _transferPostService: TransferPostService) { }

  ngOnInit(): void {
  }

  saveSelectedPost(selectedPost: Post) {
    this._transferPostService.post = selectedPost;
  }

}
