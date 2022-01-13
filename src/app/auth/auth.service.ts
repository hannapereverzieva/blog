import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './models/auth-data';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token!: string | null | undefined;
    private _baseUrl: string = 'http://localhost:3000';
    private _isAuthenticated = false;
    private _authStatusListener = new Subject<boolean>();
    private _tokenTimer!: any;
    constructor (private _httpClient: HttpClient, private _router: Router) {
    }
    createUser(email: string, password: string) {
        const authData: AuthData = { email, password};
        this._httpClient.post(`${this._baseUrl}/api/user/signup`, authData )
            .subscribe(resp => {
                console.log(resp);
            })
    }

    login(email: string, password: string) {
        const authData: AuthData = { email, password};
        this._httpClient.post<{token: string, expiresIn: number}>(`${this._baseUrl}/api/user/login`, authData )
            .subscribe(resp => {
                const token = resp.token;
                this._token = token;
                if (token) {
                    const expiresInDuration = resp.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthDataToStorage(token, expirationDate)
                    this._isAuthenticated = true;
                    this._authStatusListener.next(true);
                    this._router.navigate(['/']);
                }

            })
    }

    autoAuthUser() {
        const authData = this.getAuthDataFromStorage();
        if (!authData) return;
        const now = new Date();
        let expiresIn;
        if (authData) {
            expiresIn = authData.expirationDate.getTime() - now.getTime();
        }
        if (expiresIn && expiresIn > 0) {
            this._token = authData?.token;
            this._isAuthenticated = true;
            this.setAuthTimer(expiresIn/1000);
            this._authStatusListener.next(true);
        }

    }

    logout() {
        this._token = null;
        this._isAuthenticated = false;
        this._authStatusListener.next(false);
        this._router.navigate(['/']);
        clearTimeout(this._tokenTimer);
        this.clearAuthDataFromStorage();
    }

    getToken() {
        return this._token;
    }

    getIsAuth() {
        return this._isAuthenticated;
    }

    getAuthStatusListener() {
        return this._authStatusListener.asObservable();
    }

    private saveAuthDataToStorage(token: string, expirationDate: Date ) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString() );
    }

    private clearAuthDataFromStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    }

    private getAuthDataFromStorage() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token,
            expirationDate: new Date(expirationDate)
        }
    }

    private setAuthTimer(duration: number) {
        this._tokenTimer = window.setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }


}
