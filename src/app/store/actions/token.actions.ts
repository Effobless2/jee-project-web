import { Action } from '@ngrx/store';

export const NEW_TOKEN = '[TOKEN] New';
export const DISABLE_TOKEN = '[TOKEN] Disable';

export class NewToken implements Action {
    readonly type: string = NEW_TOKEN;

    constructor(public token: string) {}
}

export class DisableToken implements Action {
    readonly type: string = DISABLE_TOKEN;

    constructor(public token: string = null) {}
}

export type Actions = NewToken | DisableToken;
