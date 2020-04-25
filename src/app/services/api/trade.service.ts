import { Injectable } from '@angular/core';
import { HttpService } from '../tools/http.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Trade } from 'src/app/models/Trade';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TradeService{
    private controllerUrl: string = `${environment.beererApiUrl}trades`;
    private token: string;
    
    constructor(private httpService: HttpService,
        private store: Store<AppState>){
        this.store.select("token").subscribe((token: string) => this.token = token);
    }

    getAll(subscriber: (shops: Trade[]) => void, error?: (error: HttpErrorResponse) => void) : Subscription{
        return this.httpService.get(this.controllerUrl)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    get(id: number, subscriber: (shop: Trade) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.get(`${this.controllerUrl}/${id}`)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    post(shop: Trade, subscriber: (id: number) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.post(this.controllerUrl, shop, this.token)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    put(shop: Trade, subscriber: (id: number) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.put(this.controllerUrl, shop, this.token)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    delete(id: number, subscriber: (result: null) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.delete(`${this.controllerUrl}/${id}`, this.token)
        .subscribe({
            next: subscriber,
            error: error
        });
    }
}