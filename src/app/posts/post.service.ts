import { Post } from './models/post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class PostService {
  private _post!: Post;
  private _posts: Post[] = [];
  private _postsUpdated = new Subject<Post[]>();
  private _baseUrl: string = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient, private _router: Router) {}

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

  getPost(id: string): Observable<{_id: string, title: string, author: string, content: string, date: Date}> {
    return this._httpClient.get<{_id: string, title: string, author: string, content: string, date: Date}>(`${this._baseUrl}/api/posts/${id}`);
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
        this._router.navigate(["/"]);
      });
  }

  updatePost(title: string, author: string, content: string, date: Date, id: string) {
    const post : Post = { title: title, author: author, content: content, date: date, id: id, likes: [] };
    this._httpClient.put(`${this._baseUrl}/api/posts/${id}`, post)
        .subscribe(responseData => {
          const updatedPosts = [...this._posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id );
          updatedPosts[oldPostIndex] = post;
          this._posts = updatedPosts;
          this._postsUpdated.next([...this._posts]);
          this._router.navigate(["/"]);
        })
  }

  deletePost(postId: string) {
    this._httpClient.delete(`${this._baseUrl}/api/posts/${postId}`).subscribe(() => {
      const updatedPosts = this._posts.filter((post) => post.id !== postId);
      this._posts = updatedPosts;
      this._postsUpdated.next([...this._posts]);
    });
  }
}
