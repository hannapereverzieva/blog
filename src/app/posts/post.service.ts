import { Post } from "./models/post";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class PostService {
  private _post!: Post
  private _posts: Post[] = [];
  private _postsUpdated = new Subject<Post[]>();
  private _baseUrl : string = 'http://localhost:3000';

  constructor (private _httpClient: HttpClient) {
  }

  getPosts() {
    this._httpClient.get<{message: string, posts: Post[]}>(`${this._baseUrl}/api/posts`)
        .subscribe((postsData)=>{
          this._posts = postsData.posts;
          this._postsUpdated.next([...this._posts]);
        });
  }

  getPostUpdateListener() {
    return this._postsUpdated.asObservable();
  }

  addPost(title: string, author: string, content: string, date: Date) {
    const post : Post = { title: title, author: author, content: content, date: date, id: 'null'};
    this._httpClient.post<{message: string}>(`${this._baseUrl}/api/posts`, post)
        .subscribe(response => {
          console.log(response.message);
          this._posts.push(post);
          this._postsUpdated.next([...this._posts]);
        })
  }

  set post(selectedPost: Post) {
    this._post = selectedPost;
  }

  get post() : Post {
    return this._post;
  }
}
