import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpService } from '../tools/http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Beer } from 'src/app/models/Beer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';


@Injectable()
export class BeerService{
    private controllerUrl: string = `${environment.beererApiUrl}beers`;
    private token: string;

    constructor(
        private httpService: HttpService,
        private store: Store<AppState>){
            this.store.select("token").subscribe((token: string) => this.token = token);
        }

    getAll(subscriber: (beers: Beer[]) => void, error?: (error: HttpErrorResponse) => void) : Subscription{
        return this.httpService.get(this.controllerUrl)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    get(id: number, subscriber: (beers: Beer) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.get(`${this.controllerUrl}/${id}`)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    post(beer: Beer, subscriber: (beerId: number) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.post(this.controllerUrl, beer, this.token)
        .subscribe({
            next: subscriber,
            error: error
        });
    }

    put(beer: Beer, subscriber: (beerId: number) => void, error?: (error: HttpErrorResponse) => void){
        return this.httpService.put(this.controllerUrl, beer, this.token)
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