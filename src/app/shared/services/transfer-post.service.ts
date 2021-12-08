import { Post } from "../../admin/shared/interfaces";

export class TransferPostService {
  private _post!: Post

  set post(selectedPost: Post) {
    this._post = selectedPost;
  }

  get post() : Post {
    return this._post;
  }
}
