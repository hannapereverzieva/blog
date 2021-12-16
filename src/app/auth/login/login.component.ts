import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from '../models/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user!: User;
  constructor(private _router: Router) {
    this.loginForm = new FormGroup({
      emailControl : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      passwordControl : new FormControl('', [
        Validators.required,
        Validators.minLength(8)])
    })
  }

  ngOnInit(): void {

  }

  get emailControl() {
    return this.loginForm.get('emailControl')
  }

  get passwordControl() {
    return this.loginForm.get('passwordControl')
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      return;
    }
    this._router.navigate(['/']);

    this.user = {
      email: this.loginForm.value.emailControl,
      password: this.loginForm.value.passwordControl
    }
  }

}
