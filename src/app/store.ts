import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import createReducer from 'app/root.reducer'
import { Reducer } from 'react'
import createLoadingMiddleware from 'base/components/loading/loading.middleware'
import createRouterMiddleware from 'base/components/routing/routing.middleware'
import logger from 'redux-logger'
import { Action, CombinedState, ReducersMapObject } from 'redux'

export const sagaMiddleware = createSagaMiddleware()

interface MyStore extends Store {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncReducers: ReducersMapObject<CombinedState<any>, Action<unknown>>
}

export const store: MyStore = {
  ...configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(createRouterMiddleware)
        .prepend(createLoadingMiddleware)
        .concat(sagaMiddleware)
        .concat(logger),
  }),
  asyncReducers: {},
}

export type RootState = ReturnType<typeof store.getState>

function updateReducers() {
  store.replaceReducer(createReducer(store.asyncReducers))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function injectAsyncReducer(name: string, asyncReducer: Reducer<any, any>): void {
  if (!store.asyncReducers[name]) {
    store.asyncReducers[name] = asyncReducer
    updateReducers()
  }
}

export function removeAsyncReducer(name: string): void {
  if (store.asyncReducers[name]) {
    delete store.asyncReducers[name]
    updateReducers()
  }
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root.reducer', () => {
    import('./root.reducer').then(({ default: newRootReducer }) => {
      store.replaceReducer(newRootReducer)
    })
  })
}
