import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import createReducer from 'app/root.reducer'
import { Reducer } from 'react'
import { createLoadingMiddleware } from 'base/components/loading/loading.middleware'
import { createRouterMiddleware } from 'base/components/routing/routing.middleware'
import logger from 'redux-logger'

export const sagaMiddleware = createSagaMiddleware()

export const store: any = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
      .prepend(createRouterMiddleware)
      .prepend(createLoadingMiddleware)
      .concat(sagaMiddleware)
      .concat(logger),
})

store.asyncReducers = {}

function updateReducers() {
  store.replaceReducer(createReducer(store.asyncReducers))
}

export function injectAsyncReducer(name: any, asyncReducer: Reducer<any, any>) {
  if (!store.asyncReducers[name]) {
    store.asyncReducers[name] = asyncReducer
    updateReducers()
  }
}

export function removeAsyncReducer(name: string) {
  if (store.asyncReducers[name]) {
    delete store.asyncReducers[name]
    updateReducers()
  }
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root.reducer', () => {
    const newRootReducer = require('./root.reducer').default
    store.replaceReducer(newRootReducer)
  })
}
