import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { SocialUser, AuthService } from 'angularx-social-login'

export const CONNECT_USER = '[USER] Connect';
export const DISCONNECT_USER = '[USER] Disconnect';

export class ConnectUser implements Action{
    readonly type: string = CONNECT_USER;
    
    constructor(public user: SocialUser){}
}

export class DisconnectUser implements Action{
    readonly type: string = DISCONNECT_USER;

    constructor(public user: SocialUser = null){}
}

export type Actions = ConnectUser | DisconnectUser;