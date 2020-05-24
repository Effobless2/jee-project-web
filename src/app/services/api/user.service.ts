import { HttpService } from '../tools/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
    private controllerUrl = `${environment.beererApiUrl}users`;

    constructor(private http: HttpService) {}

    auth(googleToken: string,
         subscriber: (datas: {token: string}) => void,
         error?: (error: HttpErrorResponse) => void): Subscription {
        return this.http.post(
            `${this.controllerUrl}/auth`,
            googleToken
        )
        .subscribe({
            next: subscriber,
            error
        });
    }

    getAll(subscriber: (users: User[]) => void,
           error?: (error: HttpErrorResponse) => void): Subscription {
        return this.http.get(
            `${this.controllerUrl}`
        )
        .subscribe({
            next: subscriber,
            error
        });
    }
}
