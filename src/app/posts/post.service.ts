import { Post } from './models/post';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  private _post!: Post;
  private _posts: Post[] = [];
  private _postsUpdated = new Subject<Post[]>();
  private _baseUrl: string = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) {}

  getPosts() {
    this._httpClient
      .get<{ message: string; posts: any }>(`${this._baseUrl}/api/posts`)
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              author: post.author,
              date: post.date,
              id: post._id,
            };
          });
        }),
      )
      .subscribe((mappedPosts) => {
        this._posts = mappedPosts;
        this._postsUpdated.next([...this._posts]);
      });
  }

  getPostUpdateListener() {
    return this._postsUpdated.asObservable();
  }

  addPost(title: string, author: string, content: string, date: Date) {
    const post: Post = { title: title, author: author, content: content, date: date, id: '', likes: [] };
    this._httpClient
      .post<{ message: string; postId: string }>(`${this._baseUrl}/api/posts`, post)
      .subscribe((response) => {
        const id = response.postId;
        post.id = id;
        this._posts.push(post);
        this._postsUpdated.next([...this._posts]);
      });
  }

  deletePost(postId: string) {
    this._httpClient.delete(`${this._baseUrl}/api/posts/${postId}`).subscribe(() => {
      const updatedPosts = this._posts.filter((post) => post.id !== postId);
      this._posts = updatedPosts;
      this._postsUpdated.next([...this._posts]);
    });
  }

  set post(selectedPost: Post) {
    this._post = selectedPost;
  }

  get post(): Post {
    return this._post;
  }
}
