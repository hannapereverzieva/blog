import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private _postService: PostService, private _router: Router) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      titleControl: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      authorControl: new FormControl('', [Validators.required]),
      contentControl: new FormControl('', [Validators.required]),
    });
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

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }

    this._postService.addPost(
      this.postForm.value.titleControl,
      this.postForm.value.authorControl,
      this.postForm.value.contentControl,
      new Date(),
    );

    this.postForm.reset();
    this._router.navigate(['/']);
  }
}
