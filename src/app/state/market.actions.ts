import { Action } from '@ngrx/store';
import { Payment } from '../model/payment';

/**
 * Creating the enum type 
 */
export enum MarketActionTypes {
    GoLive = '[Market] Market Go Live',
    RefreshGrid = '[Market] Refresh 2D Grid',
    AddPayment = '[Market] Add Payment',
    UpdateCode = '[Market] Update Market Code',
    UpdateWeightConst = '[Market] Update Weight Constant',
}

/**
 * Creating the Action classes
 */
export class GoLive implements Action {
    readonly type = MarketActionTypes.GoLive;

    constructor(public payload: boolean) {
    }
}

export class RefreshGrid implements Action {
    readonly type = MarketActionTypes.RefreshGrid;

    constructor(public payload: string[][]) {
    }
}

export class AddPayment implements Action {
    readonly type = MarketActionTypes.AddPayment;

    constructor(public payload: Payment) {
    }
}

export class UpdateCode implements Action {
    readonly type = MarketActionTypes.UpdateCode;

    constructor(public payload: number) {
    }
}

export class UpdateWeightConstant implements Action {
    readonly type = MarketActionTypes.UpdateWeightConst;

    constructor(public payload: string) {
    }
}

/**
 * Defining the type of MarketActions as a Union.
 */
export type MarketActions = GoLive
    | RefreshGrid
    | AddPayment
    | UpdateCode
    | UpdateWeightConstant