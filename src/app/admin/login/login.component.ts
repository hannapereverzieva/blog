import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(8)])
    })
  }

  ngOnInit(): void {

  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  submit() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
  }

}
