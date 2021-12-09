import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../../shared/interfaces";
import { PostNewPostService } from "../shared/services/post-new-post.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private _postNewPostService: PostNewPostService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title : new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      author : new FormControl('', [
        Validators.required,
      ]),
      content : new FormControl('', [
        Validators.required])
    })
  }

  get title() {
    return this.postForm.get('title')
  }

  get author() {
    return this.postForm.get('author')
  }

  get content() {
    return this.postForm.get('content')
  }

  submit() {
    if(this.postForm.invalid) {
      return;
    }

    const post : Post = {
      title: this.postForm.value.title,
      author: this.postForm.value.author,
      content: this.postForm.value.content,
      date: new Date()
    }

    this._postNewPostService.post = post;

    this.postForm.reset();
  }

}
