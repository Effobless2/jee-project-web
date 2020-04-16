import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
   }

   async sendReq(){
        this.http.get(
            "http://localhost:8080/beers"
        ).subscribe(data => {
          console.log(data)
        });
   }
}