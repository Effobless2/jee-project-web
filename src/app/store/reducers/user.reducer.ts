import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/models/User';

const initialUser: User = null;

export function userReducer(state: User = initialUser, action: UserActions.Actions): User {
    let result = state;
    switch (action.type) {
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
