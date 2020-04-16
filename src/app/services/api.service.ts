import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { NewToken } from '../store/actions/token.actions';

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
        this.store.dispatch(new NewToken(data.token));
     })
   }
}
