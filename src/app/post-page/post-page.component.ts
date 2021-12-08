import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../admin/shared/interfaces";
import { TransferPostService } from "../shared/services/transfer-post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public single_post!: Post;
  constructor(private _transferPostService: TransferPostService) { }

  ngOnInit(): void {
    this.single_post = this._transferPostService.post;
  }

}
