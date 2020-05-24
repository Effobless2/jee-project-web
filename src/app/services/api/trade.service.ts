import { Injectable } from '@angular/core';
import { HttpService, ENC_TYPE_FORM_DATA } from '../tools/http.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Trade } from 'src/app/models/Trade';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TradeService {
    private controllerUrl = `${environment.beererApiUrl}trades`;
    private token: string;

    constructor(
        private httpService: HttpService,
        private store: Store<AppState>) {
        this.store.select('token').subscribe((token: string) => this.token = token);
    }

    getAll(subscriber: (shops: Trade[]) => void,
           error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.get(this.controllerUrl)
        .subscribe({
            next: subscriber,
            error
        });
    }

    get(id: number,
        subscriber: (shop: Trade) => void,
        error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.get(`${this.controllerUrl}/${id}`)
        .subscribe({
            next: subscriber,
            error
        });
    }

    post(shop: Trade,
         subscriber: (id: number) => void,
         error?: (error: HttpErrorResponse) => void): Subscription {
        const file: File|string = shop.profilePict;
        shop.profilePict = null;
        return this.httpService.post(this.controllerUrl, shop, this.token)
        .subscribe({
            next: (id: number) => {
                if (file && typeof(file) !== 'string') {
                    return this._sendImage(id, file as File, subscriber, error);
                } else {
                    subscriber(id);
                }
            },
            error
        });
    }

    put(shop: Trade,
        subscriber: (id: number) => void,
        error?: (error: HttpErrorResponse) => void): Subscription {
        const file: File|string = shop.profilePict;
        if (typeof(shop.profilePict) !== 'string') {
            shop.profilePict = null;
        }
        return this.httpService.put(`${this.controllerUrl}/${shop.id}`, shop, this.token)
        .subscribe({
            next: (id: number) => {
                if (file && typeof(file) !== 'string') {
                    return this._sendImage(shop.id, file as File, subscriber, error);
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

    private _sendImage(id: number,
                       file: File,
                       subscriber: (result: number) => void,
                       error?: (error: HttpErrorResponse) => void): Subscription {
        const fd: FormData = new FormData();
        fd.set('file', file);
        return this.httpService.patch(`${this.controllerUrl}/image/${id}`, fd, this.token, ENC_TYPE_FORM_DATA)
        .subscribe({
            next: () => subscriber(id),
            error
        });
    }
}
