import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

interface tokenResult{
  token: string;
}
@Injectable()
export class HttpService {
    constructor(private http: HttpClient,  private store: Store<AppState>) {
    }
    get(url: string, token?: string): Observable<any>{
      return this.http.get(
          url,
          {
              headers: token ? new HttpHeaders({
                  'Authorization': token
              }) : null
          }
      );
    }

	post(url: string, body: any, token?: string) : Observable<any>{
		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type':  'application/json'
		});
		if(token)
			headers.append('Authorization', token);
		
		return this.http.post(
			url,
			body,
			{
				headers: headers
			}
		);
	}

	put(url: string, body: any, token?: string){
		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type':  'application/json'
		});
		if(token)
			headers.append('Authorization', token);
		
		return this.http.put(
			url,
			body,
			{
				headers: headers
			}
		);
	}

	patch(url: string, body: any, token?: string){
		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type':  'application/json'
		});
		if(token)
			headers.append('Authorization', token);
		
		return this.http.patch(
			url,
			body,
			{
				headers: headers
			}
		);
	}

	delete(url: string, token?: string){
		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type':  'application/json'
		});
		if(token)
			headers.append('Authorization', token);
		
		return this.http.delete(
			url,
			{
				headers: token ? new HttpHeaders({
					'Authorization': token
				}) : null
			}
		);
	}
}
