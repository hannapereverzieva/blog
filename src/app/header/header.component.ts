import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuth = false;
  private _authListenerSubs!: Subscription;
  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuth = this._authService.getIsAuth();
    this._authListenerSubs = this._authService.getAuthStatusListener()
        .subscribe(isAuth => {
          this.userIsAuth = isAuth;
        })
  }

  onLogin(event: Event) {}
  onSignup(event: Event) {}

  onLogout(event: Event) {
    event.preventDefault();
    this._authService.logout();
  }

  ngOnDestroy (): void {
    this._authListenerSubs.unsubscribe();
  }
}
