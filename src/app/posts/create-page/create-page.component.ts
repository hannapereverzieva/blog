import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from "../models/post";
import { fileType } from './file-type.validator';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;
  isLoading = false;
  imagePreview!: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  private _mode = 'create';
  private _postId!: any;
  private _post! : any;
  constructor(private _postService: PostService, private _router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      titleControl: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      authorControl: new FormControl('', [Validators.required]),
      contentControl: new FormControl('', [Validators.required]),
      imageControl: new FormControl(null, {validators: [Validators.required], asyncValidators: [fileType]})
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
                this._post = {id: postData._id, title: postData.title, author: postData.author, content: postData.content, imagePath: postData.imagePath }
                this.postForm.patchValue({
                  titleControl: this._post.title,
                  authorControl: this._post.author,
                  contentControl: this._post.content,
                  imageControl: this._post.imagePath
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

  get imageControl() {
    return this.postForm.get('imageControl');
  }

  onImagePicked(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({imageControl: file});
    this.imageControl?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    }
    reader.readAsDataURL(file);
  }

  onAddTag(event: MatChipInputEvent): void {
    const input = event.chipInput;
    console.log(input);
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value);
    }
    if (input) {
      input.inputElement.value = '';
    }
  }
  onRemoveTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >=0) {
      this.tags.splice(index, 1);
    }
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
          this.postForm.value.imageControl,
          this.tags
      );
    } else {
      this._postService.updatePost(this.postForm.value.titleControl,
          this.postForm.value.authorControl,
          this.postForm.value.contentControl,
          new Date(), this._postId,
          this.postForm.value.image);
          //to do implement tags update
    }

    this.postForm.reset();
    this._router.navigate(['/']);
  }
}
