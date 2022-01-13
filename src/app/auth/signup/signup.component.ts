import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signupForm: FormGroup;
  user!: User;
  constructor(private _router: Router, private _authService: AuthService) {
    this.signupForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit(): void {}

  get emailControl() {
    return this.signupForm.get('emailControl');
  }

  get passwordControl() {
    return this.signupForm.get('passwordControl');
  }

  onSignup(event: Event) {
    event.preventDefault();
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this._router.navigate(['/']);

    this.user = {
      email: this.signupForm.value.emailControl,
      password: this.signupForm.value.passwordControl,
    };
    this._authService.createUser(this.signupForm.value.emailControl, this.signupForm.value.passwordControl)
  }
}
