import { Post } from "../interfaces";

export class PostService {
  private _post!: Post

  set post(selectedPost: Post) {
    this._post = selectedPost;
  }

  get post() : Post {
    return this._post;
  }
}
