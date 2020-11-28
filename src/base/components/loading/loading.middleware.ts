import { PayloadAction } from '@reduxjs/toolkit'
import { AnyAction, Dispatch } from 'redux'
import { loadingActions } from './loading.slice'

export enum Loading {
  HIDE,
  SHOW,
  RESET,
}

const createLoadingMiddleware = () => (next: Dispatch<AnyAction>) => (
  action: PayloadAction<{ spinner: Loading }>
) => {
  if (action.payload?.spinner === Loading.SHOW) {
    next(loadingActions.show())
  }

  next(action)

  if (action.payload?.spinner === Loading.HIDE) {
    next(loadingActions.hide())
  }
}

export default createLoadingMiddleware
