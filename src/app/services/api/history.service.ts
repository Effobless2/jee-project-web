import { Injectable } from '@angular/core';
import { HttpService } from '../tools/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HistoryService {
    private controllerUrl = `${environment.beererApiUrl}history`;
    constructor(private httpService: HttpService) {

    }

    getAll(subscriber: (beers: History[]) => void,
           error?: (error: HttpErrorResponse) => void): Subscription {
        return this.httpService.get(this.controllerUrl)
        .subscribe({
            next: subscriber,
            error
        });
    }
}
