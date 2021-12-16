import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../models/post";
import { PostService } from "../post.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      titleControl : new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      authorControl : new FormControl('', [
        Validators.required,
      ]),
      contentControl : new FormControl('', [
        Validators.required])
    })
  }

  get titleControl() {
    return this.postForm.get('titleControl')
  }

  get authorControl() {
    return this.postForm.get('authorControl')
  }

  get contentControl() {
    return this.postForm.get('contentControl')
  }

  submit() {
    if(this.postForm.invalid) {
      return;
    }

    const post : Post = {
      title: this.postForm.value.titleControl,
      author: this.postForm.value.authorControl,
      content: this.postForm.value.contentControl,
      date: new Date()
    }

    this._postService.post = post;

    this.postForm.reset();
  }

}
