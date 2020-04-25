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
				'Content-Type':  'application/json',
                  'Authorization': `Bearer ${token}`
              }) : null
          }
      );
    }

	post(url: string, body: any, token?: string) : Observable<any>{
		return this.http.post(
			url,
			body,
			{
				headers: token ? new HttpHeaders({
					'Content-Type':  'application/json',
					  'Authorization': `Bearer ${token}`
				  }) : null
			}
		);
	}

	put(url: string, body: any, token?: string){
		return this.http.put(
			url,
			body,
			{
				headers: token ? new HttpHeaders({
					'Content-Type':  'application/json',
					  'Authorization': `Bearer ${token}`
				  }) : null
			}
		);
	}

	patch(url: string, body: any, token?: string){
		return this.http.patch(
			url,
			body,
			{
				headers: token ? new HttpHeaders({
					'Content-Type':  'application/json',
					  'Authorization': `Bearer ${token}`
				  }) : null
			}
		);
	}

	delete(url: string, token?: string){		
		return this.http.delete(
			url,
			{
				headers: token ? new HttpHeaders({
					  'Authorization': `Bearer ${token}`
				  }) : null
			}
		);
	}
}
