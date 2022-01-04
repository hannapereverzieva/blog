import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from "../models/post";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;
  isLoading = false;
  private _mode = 'create';
  private _postId!: any;
  private _post! : any;
  constructor(private _postService: PostService, private _router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      titleControl: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      authorControl: new FormControl('', [Validators.required]),
      contentControl: new FormControl('', [Validators.required]),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
          if (paramMap.has('id')) {
            this.isLoading = true;
            this._mode = 'edit';
            this._postId = paramMap.get('id') as string;
            this._postService.getPost(this._postId).subscribe(postData => {
              this.isLoading = false;
              if(postData) {
                this._post = {id: postData._id, title: postData.title, author: postData.author, content: postData.content }
                this.postForm.patchValue({
                  titleControl: this._post.title,
                  authorControl: this._post.author,
                  contentControl: this._post.content
                })
              }
            });

          } else {
            this._mode = 'create';
            this._postId = null;
          }
        }
    );

  }

  get titleControl() {
    return this.postForm.get('titleControl');
  }

  get authorControl() {
    return this.postForm.get('authorControl');
  }

  get contentControl() {
    return this.postForm.get('contentControl');
  }

  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }

    this.isLoading = true;

    if(this._mode === 'create') {
      this._postService.addPost(
          this.postForm.value.titleControl,
          this.postForm.value.authorControl,
          this.postForm.value.contentControl,
          new Date(),
      );
    } else {
      this._postService.updatePost(this.postForm.value.titleControl,
          this.postForm.value.authorControl,
          this.postForm.value.contentControl,
          new Date(), this._postId);
    }



    this.postForm.reset();
    this._router.navigate(['/']);
  }
}
