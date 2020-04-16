import { Action } from '@ngrx/store'
import { User } from 'src/app/models/User';

export const CONNECT_USER = '[USER] Connect';
export const DISCONNECT_USER = '[USER] Disconnect';

export class ConnectUser implements Action{
    readonly type: string = CONNECT_USER;
    
    constructor(public user: User){}
}

export class DisconnectUser implements Action{
    readonly type: string = DISCONNECT_USER;

    constructor(public user: User = null){}
}

export type Actions = ConnectUser | DisconnectUser;