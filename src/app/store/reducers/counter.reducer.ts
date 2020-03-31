import { Action } from '@ngrx/store'
import * as CounterActions from '../actions/counter.actions';
import { Counter } from '../../models/counter.model';

var initialCounter : Counter = {
    count: 0
}

export function reducer(state: Counter = initialCounter, action: CounterActions.Actions) : Counter{
    let newState : Counter = {...state};
    newState.count = state.count;
    switch(action.type){
        case CounterActions.INCREMENT_COUNTER :
            newState.count++
            break;
        case CounterActions.DECREMENT_COUNTER :
            if(newState.count > 0)
            newState.count--;
            break;
        default:
            console.log('nothing');
            break;
    }
    return newState;
}