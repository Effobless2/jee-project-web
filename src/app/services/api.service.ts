import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { NewToken } from '../store/actions/token.actions';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { ConnectUser } from '../store/actions/user.actions';

interface tokenResult{
  token: string;
}
@Injectable()
export class HttpService {
  constructor(private http: HttpClient,  private store: Store<AppState>) {
   }

   async sendReq(){
        this.http.get(
            "http://localhost:8080/beers"
        ).subscribe(data => {
          console.log(data)
        });
   }

   async apiAuth(googleToken: string){
     this.http.post(
      "http://localhost:8080/users/auth",
      googleToken
     ).subscribe((data: tokenResult) => {
        let decoded: any = jwt_decode(data.token);
        let newUser: User = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          avatarUrl: decoded.avatarUrl
        };
        this.store.dispatch(new ConnectUser(newUser));
        this.store.dispatch(new NewToken(data.token));
     })
   }
}
