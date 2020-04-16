import * as TokenActions from '../actions/token.actions';

const initialToken: string = null;

export function tokenReducer(state: string = initialToken, action: TokenActions.Actions) : string {

    let result = state;
    switch(action.type){
        case TokenActions.NEW_TOKEN :
            result = action.token;
            break;
        case TokenActions.DISABLE_TOKEN :
            result = null;
            break;
        default:
            break;
    }
    return result;
}