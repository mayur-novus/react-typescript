import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { injectAsyncReducer } from 'app/store'
import { Loading } from 'base/components/loading/loading.middleware'

export interface BarState {
  data: any
  error?: Error
}

const initialState: BarState = {
  data: null,
}

const barSlice = createSlice({
  name: 'bar',
  initialState,
  reducers: {
    reset(state: BarState) {
      state.data = null
    },
    getUser: {
      reducer: (state: BarState) => {},
      prepare: (id: string) => ({
        payload: {
          id,
          spinner: Loading.SHOW,
        },
      }),
    },
    getUserSuccess: {
      reducer: (state: BarState, action: PayloadAction<{ response: any }>) => {
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
      reducer: (state: BarState, action: PayloadAction<{ error: Error }>) => {
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

const { actions: barActions, name: barKey, reducer: barReducer } = barSlice

injectAsyncReducer(
  'async1',
  combineReducers({
    [barKey]: barReducer,
  })
)

const barSliceSelector = (state: any): BarState => state.async1[barKey]

export { barActions, barSliceSelector }
