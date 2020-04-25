import { AuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { DisconnectUser, ConnectUser } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { DisableToken, NewToken } from '../store/actions/token.actions';
import { UserService } from './api/user.service';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {
    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        private userService: UserService
    ){}

    async signIn(){
        let newUser: SocialUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.userService.auth(newUser.idToken, (data: {token:string}) => {
            let decoded: any = jwt_decode(data.token);
            let newUser: User = {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                avatarUrl: decoded.avatarUrl
            };
            this.store.dispatch(new ConnectUser(newUser));
            this.store.dispatch(new NewToken(data.token));
        });
    }

    async signOut(){
        await this.authService.signOut();
        this.store.dispatch(new DisconnectUser());
        this.store.dispatch(new DisableToken());
    }
}