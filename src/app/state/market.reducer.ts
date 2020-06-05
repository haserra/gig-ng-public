import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Payment } from '../model/payment';
import * as fromRoot from './app.state';
import { MarketActions, MarketActionTypes } from './market.actions';

/**
 * This slice of state represents all the entire state tree.
 * Scalable if required.
 */
export interface State extends fromRoot.State {
    market: MarketState;
}

/**
 * This slice of state represents the Market state (my own convention to represent grids, payments and payments lists)
 */
export interface MarketState {
    liveStatus: boolean;
    currentCode: number | null;
    weightConstant: string | null;
    currentGrid: string[][] | null;
    payments: Payment[];
}

const initialState: MarketState = {
    liveStatus: false,
    currentCode: null,
    weightConstant: null,
    currentGrid: null,
    payments: []
}

/**
 * Creating Feature Selectors for the Market
 */
const getMarketFeatureState = createFeatureSelector<MarketState>('marketReducer');

export const getLiveStatus = createSelector(getMarketFeatureState, state => state.liveStatus);

export const getCurrentCode = createSelector(getMarketFeatureState, state => state.currentCode);

export const getWeightConstant = createSelector(getMarketFeatureState, state => state.weightConstant);

export const getCurrentGrid = createSelector(getMarketFeatureState, state => state.currentGrid);

export const getPaymentsList = createSelector(getMarketFeatureState, state => state.payments);

/**
 * The Reducer - it is the reducer that basically defines the state of the store
 */
export function reducer(state: MarketState = initialState, action: MarketActions): MarketState {

    switch (action.type) {
        case MarketActionTypes.GoLive:
            return {
                ...state,
                liveStatus: action.payload
            };

        case MarketActionTypes.RefreshGrid:
            return {
                ...state,
                currentGrid: action.payload
            };

        case MarketActionTypes.UpdateCode:
            return {
                ...state,
                currentCode: action.payload
            };

        case MarketActionTypes.UpdateWeightConst:
            return {
                ...state,
                weightConstant: action.payload
            };

        case MarketActionTypes.AddPayment:
            return {
                ...state,
                payments: [...state.payments, action.payload]
            }

        default:
            return state;
    }
}