import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { injectAsyncReducer } from 'app/store'
import { Loading } from 'base/components/loading/loading.middleware'

interface FooState {
  data: any
  error?: Error
}

const initialState: FooState = {
  data: null,
}

const fooSlice = createSlice({
  name: 'foo',
  initialState,
  reducers: {
    reset(state: FooState) {
      state.data = null
    },
    getUser: {
      reducer: () => {},
      prepare: (id: string) => ({
        payload: {
          id,
          spinner: Loading.SHOW,
        },
      }),
    },
    getUserSuccess: {
      reducer: (state: FooState, action: PayloadAction<{ response: any }>) => {
        state.data = action.payload.response
      },
      prepare: (response: any) => ({
        payload: {
          response,
          spinner: Loading.HIDE,
        },
      }),
    },
    getUserError: {
      reducer: (state: FooState, action: PayloadAction<{ error: Error }>) => {
        state.error = action.payload.error
      },
      prepare: (error: Error) => ({
        payload: {
          error,
          spinner: Loading.HIDE,
        },
      }),
    },
  },
})

// Actions, reducer and name
const { actions: fooActions, name: fooKey, reducer: fooReducer } = fooSlice

const fooSliceSelector = (state: any): FooState => state[fooKey]

injectAsyncReducer(fooKey, fooReducer)

// Export only what is required
export { fooActions, fooSliceSelector }
