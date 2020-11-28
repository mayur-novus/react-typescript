import { Loading } from 'base/components/loading/loading.middleware'
import { PayloadAction } from '@reduxjs/toolkit'
import { FooState } from './foo.interfaces'

const getUser = {
  reducer: () => {},
  prepare: (id: string) => ({
    payload: {
      id,
      spinner: Loading.SHOW,
    },
  }),
}

const getUserSuccess = {
  reducer: (state: FooState, action: PayloadAction<{ response: unknown }>) => {
    state.data = action.payload.response
  },
  prepare: (response: unknown) => ({
    payload: {
      response,
      spinner: Loading.HIDE,
    },
  }),
}

const getUserError = {
  reducer: (state: FooState, action: PayloadAction<{ error: Error }>) => {
    state.error = action.payload.error
  },
  prepare: (error: Error) => ({
    payload: {
      error,
      spinner: Loading.HIDE,
    },
  }),
}

export { getUser, getUserSuccess, getUserError }
