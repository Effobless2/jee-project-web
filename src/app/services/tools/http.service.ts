import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface tokenResult{
  token: string;
}
@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {
	}

	private _headerConstructor(token?: string): HttpHeaders {
		return token ? new HttpHeaders({
			'Content-Type':  'application/json',
			  'Authorization': `Bearer ${token}`
		  }) : null;
	}
	
    get(url: string, token?: string): Observable<any>{
        return this.http.get(
            url,
            {
                headers: this._headerConstructor(token)
            }
      );
    }

	post(url: string, body: any, token?: string) : Observable<any>{
		return this.http.post(
			url,
			body,
			{
				headers: this._headerConstructor(token)
			}
		);
	}

	put(url: string, body: any, token?: string){
		return this.http.put(
			url,
			body,
			{
				headers: this._headerConstructor(token)
			}
		);
	}

	patch(url: string, body: any, token?: string){
		return this.http.patch(
			url,
			body,
			{
				headers: this._headerConstructor(token)
			}
		);
	}

	delete(url: string, token?: string){		
		return this.http.delete(
			url,
			{
				headers: this._headerConstructor(token)
			}
		);
	}
}
