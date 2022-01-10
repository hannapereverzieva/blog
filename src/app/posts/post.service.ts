import { Post } from './models/post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Tag } from "./models/tag";

@Injectable({ providedIn: 'root' })
export class PostService {
  private _post!: Post;
  private _posts: Post[] = [];
  private _postsUpdated = new Subject<{posts: Post[], postsCount: number}>();
  private _tags = [];
  private _tagsUpdated = new Subject<{tags: any}>();
  private _baseUrl: string = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${postsPerPage}&?page=${currentPage}`;
    this._httpClient
      .get<{ message: string; posts: any; maxPosts: number }>(`${this._baseUrl}/api/posts${queryParams}`)
      .pipe(
        map((postData) => {
          return {
              posts: postData.posts.map((post: any) => {
                  return {
                      title: post.title,
                      content: post.content,
                      author: post.author,
                      creator: post.creator,
                      date: post.date,
                      id: post._id,
                      imagePath: post.imagePath
                  };
              }),
              maxPosts: postData.maxPosts
          }
        }),
      )
      .subscribe((mappedPostsData) => {
        this._posts = mappedPostsData.posts;
        this._postsUpdated.next({posts: [...this._posts], postsCount: mappedPostsData.maxPosts});
      });
  }

  getPostUpdateListener() {
    return this._postsUpdated.asObservable();
  }

  getTagUpdateListener() {
      return this._tagsUpdated.asObservable();
  }

  getPost(id: string): Observable<{_id: string, title: string, author: string, content: string, date: Date, imagePath: string}> {
    return this._httpClient.get<{_id: string, title: string, author: string, content: string, date: Date, imagePath: string}>(`${this._baseUrl}/api/posts/${id}`);
  }

  addPost(title: string, author: string, content: string, date: Date, image: File, tags: string[]) {
      const postData = new FormData();
      const updatedTags = tags.join(',');
      console.log(updatedTags);
      postData.append('title', title);
      postData.append('author', author);
      postData.append('content', content);
      postData.append('image', image, title);
      postData.append('tags', updatedTags);
      console.log(postData);
    this._httpClient
      .post<{ message: string; post: Post }>(`${this._baseUrl}/api/posts`, postData)
      .subscribe((response) => {
        this._router.navigate(["/"]);
      });
  }

  updatePost(title: string, author: string, content: string, date: Date, id: string, image: File | string) {
      let postData: Post | FormData;
      if (typeof(image) === 'object') {
          postData = new FormData();
          postData.append('id', id);
          postData.append('title', title);
          postData.append('author', author);
          postData.append('content', content);
          postData.append('image', image, title);
      } else {
          postData = {
              title: title,
              author: author,
              content: content,
              date: date,
              id: id,
              likes: [],
              imagePath: image
          };
      }

    this._httpClient.put(`${this._baseUrl}/api/posts/${id}`, postData)
        .subscribe(responseData => {
          this._router.navigate(["/"]);
        })
  }

  deletePost(postId: string) {
    return this._httpClient.delete(`${this._baseUrl}/api/posts/${postId}`);
  }

  getTags() {
      this._httpClient.get<{ message: string; tags: any;}>(`${this._baseUrl}/api/tags`)
          .pipe(
              map(tagData => {
                  return tagData.tags.map((tag: any) => {
                          return {
                              name: tag.name,
                              id: tag._id,
                              postId: tag.postIds
                          };
                      })
              }),
          )
          .subscribe((mappedTagsData) => {
              this._tags = mappedTagsData;
              //@ts-ignore
              this._tagsUpdated.next([...this._tags]);
          });
  }
}
