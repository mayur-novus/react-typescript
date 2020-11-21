import { PayloadAction } from '@reduxjs/toolkit'
import { routingActions } from './routing.slice'
import { routerHistory } from './routing.hook'

export const createRouterMiddleware = () => (next: any) => (action: PayloadAction<any>) => {
  if (action.type === routingActions.push.type) {
    routerHistory?.push(action.payload)
  } else if (action.type === routingActions.replace.type) {
    routerHistory?.replace(action.payload)
  } else if (action.type === routingActions.goBack.type) {
    routerHistory?.goBack(action.payload)
  } else {
    next(action)
  }
}
