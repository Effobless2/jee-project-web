import { HttpService } from '../tools/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService{
    constructor(private http: HttpService){}

    auth(googleToken: string, fun: ({token: string}) => void){
        return this.http.post(
            `${environment.beererApiUrl}users/auth`,
            googleToken
        ).subscribe(fun);
    }
}