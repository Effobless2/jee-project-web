import { Action } from '@ngrx/store'
import * as UserActions from '../actions/user.actions';
import { SocialUser, GoogleLoginProvider } from 'angularx-social-login'

const initialUser: SocialUser = null;

export function userReducer(state: SocialUser = initialUser, action: UserActions.Actions) : SocialUser {

    let result = state;
    switch(action.type){
        case UserActions.CONNECT_USER :
            result = action.user;
            break;
        case UserActions.DISCONNECT_USER :
            result = null;
            break;
        default:
            break;
    }
    return result;
}