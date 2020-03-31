import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Counter } from '../../models/counter.model';

export const INCREMENT_COUNTER = '[COUNTER] Increment';
export const DECREMENT_COUNTER = '[COUNTER] Decrement';

export class IncrementCounter implements Action{
    readonly type: string = INCREMENT_COUNTER;
}

export class DecrementCounter implements Action{
    readonly type: string = DECREMENT_COUNTER;
}

export type Actions = IncrementCounter | DecrementCounter;