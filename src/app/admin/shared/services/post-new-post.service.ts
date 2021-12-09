import {Post} from "../../../shared/interfaces";

export class PostNewPostService {
  private _post!: Post

  set post(newPost: Post) {
    this._post = newPost;
  }

  get post() : Post {
    return this._post;
  }
}
