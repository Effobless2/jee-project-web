import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpService, ENC_TYPE_FORM_DATA } from '../tools/http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Beer } from 'src/app/models/Beer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';


@Injectable()
export class BeerService {
    private controllerUrl = `${environment.beererApiUrl}beers`;
    private token: string;

    constructor(
        private httpService: HttpService,
        private store: Store<AppState>) {
            this.store.select('token').subscribe((token: string) => this.token = token);
        }

    getAll(subscriber: (beers: Beer[]) => void,
           error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.get(this.controllerUrl)
        .subscribe({
            next: subscriber,
            error
        });
    }

    get(id: number,
        subscriber: (beer: Beer) => void,
        error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.get(`${this.controllerUrl}/${id}`)
        .subscribe({
            next: subscriber,
            error
        });
    }

    post(beer: Beer,
         subscriber: (id: number) => void,
         error?: (error: HttpErrorResponse) => void): Subscription {
        const file: File = typeof(beer.profilePict) !== 'string' ? beer.profilePict : null;
        beer.profilePict = null;
        return this.httpService.post(this.controllerUrl, beer, this.token)
        .subscribe({
            next: (id: number) => {
                if (file) {
                   return this._sendImage(id, file as File, subscriber, error);
                } else {
                    subscriber(id);
                }
            },
            error
        });
    }

    private _sendImage(id: number,
                       file: File,
                       subscriber: (id: number) => void,
                       error: (error: HttpErrorResponse) => void): Subscription {
        const fd: FormData = new FormData();
        fd.set('file', file);
        return this.httpService.patch(`${this.controllerUrl}/image/${id}`, fd, this.token, ENC_TYPE_FORM_DATA)
            .subscribe({
                next: subscriber,
                error
            });
    }

    put(beer: Beer,
        subscriber: (id: number) => void,
        error?: (error: HttpErrorResponse) => void): Subscription {
        const file: File|string = beer.profilePict;
        if (typeof(beer.profilePict) !== 'string') {
            beer.profilePict = null;
        }
        return this.httpService.put(`${this.controllerUrl}/${beer.id}`, beer, this.token)
        .subscribe({
            next: (id: number) => {
                if (file && typeof(file) !== 'string') {
                    return this._sendImage(beer.id, file as File, subscriber, error);
                } else {
                    subscriber(id);
                }
            },
            error
        });
    }

    delete(id: number,
           subscriber: (result: null) => void,
           error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.delete(`${this.controllerUrl}/${id}`, this.token)
        .subscribe({
            next: subscriber,
            error
        });
    }
}
