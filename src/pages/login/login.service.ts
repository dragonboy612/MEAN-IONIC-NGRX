/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 04-01-2018
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import { HttpService } from "../../providers/http-service/http.service";
import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";
import { ICurrentUserState } from "./store/currentUser.reducer";
const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the AuthService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/

export interface HttpServerResponse extends Response {
  message?:string,
  code?:number,
  token?:string,
  user?:ICurrentUserState
}

@Injectable()
export class LoginService extends HttpService {

  private readonly _authUrl:string = "/auth"
  private readonly _isAuthUrl:string = "/isauth"
  private readonly _signUpUrl:string = "/signup"

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) public readonly envVariables:IEnvironment
  ) {
    super(http,envVariables);
  }

  doLogout():Observable<any> {
    return this.dellToken()
  }

  isAuth():Observable<ICurrentUserState>{
    this.path = this._isAuthUrl
    return this.get().map(res=> res.isAuth || {})
    .catch(err => Observable.of({
      error:err.error.error || err.error || err.error.message || err,
      message:err.message||'Authentication failed!'
    }))
  }

  doAuth(_creds:any) :Observable<HttpServerResponse> {
    this.path = this._authUrl
    return this.post({
      email:_creds.email,
      password: _creds.password
    })
    .catch(err => Observable.of({
      error:err.error.error || err.error || err.error.message || err,
      message:err.message||'Login authentication failed!'}
    ))
  }

  doCreateUser(_payload:{email:string, password:string}):Observable<HttpServerResponse> {
    this.path = this._signUpUrl
    return this.post(_payload)
    .catch(err => Observable.of({
      error:err.error.error || err.error || err.error.message || err,
      message:err.message||'Signup failed!'
    }))

  }

  /* Token managers Methodes */
  saveToken(providerResponse: any):Observable<string>  {
    //console.log(providerResponse)
    return Observable.fromPromise(
      Promise.resolve(localStorage.setItem(STORAGE_ITEM, JSON.stringify(providerResponse.token)))
      .then(_=> providerResponse.token)
      .catch(err => err)
    )
  }

  dellToken():Observable<any> {
    return Observable.fromPromise(
      Promise.resolve(localStorage.removeItem(STORAGE_ITEM))
    )
  }
}
