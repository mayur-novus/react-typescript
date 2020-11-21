import { PayloadAction } from '@reduxjs/toolkit'
import { loadingActions } from './loading.slice'

export enum Loading {
  HIDE,
  SHOW,
  RESET,
}

export const createLoadingMiddleware = () => (next: any) => (
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
