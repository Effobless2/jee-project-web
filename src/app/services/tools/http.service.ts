import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const CONTENT_TYPE_JSON = 'application/json';
export const ENC_TYPE_FORM_DATA = 'multipart/form-data';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {
    }

    private _headerConstructor(token?: string, contentType: string = CONTENT_TYPE_JSON): HttpHeaders {
        let result: HttpHeaders = new HttpHeaders();
        if (token) {
            result = result.set('Authorization', `Bearer ${token}`);
        }
        if (contentType === CONTENT_TYPE_JSON) {
            result = result.set('Content-Type', CONTENT_TYPE_JSON);
        } else {
            result = result.set('enctype', ENC_TYPE_FORM_DATA);
        }
        return result;
    }

    get(url: string, token?: string): Observable<any> {
        return this.http.get(
            url,
            {
                headers: this._headerConstructor(token)
            }
        );
    }

    post(url: string, body: any, token?: string, contentType: string = CONTENT_TYPE_JSON): Observable<any> {
        return this.http.post(
            url,
            body,
            {
                headers: this._headerConstructor(token, contentType)
            }
        );
    }

    put(url: string, body: any, token?: string, contentType: string = CONTENT_TYPE_JSON): Observable<any> {
        return this.http.put(
            url,
            body,
            {
                headers: this._headerConstructor(token, contentType)
            }
        );
    }

    patch(url: string, body: any, token?: string, contentType: string = CONTENT_TYPE_JSON): Observable<any> {
        return this.http.patch(
            url,
            body,
            {
                headers: this._headerConstructor(token, contentType)
            }
        );
    }

    delete(url: string, token?: string): Observable<any> {
        return this.http.delete(
            url,
            {
                headers: this._headerConstructor(token)
            }
        );
    }
}
