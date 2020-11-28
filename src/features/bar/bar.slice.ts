import { combineReducers, createSlice } from '@reduxjs/toolkit'
import { injectAsyncReducer, RootState } from 'app/store'
import { BarState } from './bar.interfaces'
import { getUser, getUserError, getUserSuccess } from './barslice-user-workflow'

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
    getUser,
    getUserSuccess,
    getUserError,
  },
})

const { actions: barActions, name: barKey, reducer: barReducer } = barSlice

injectAsyncReducer(
  'async1',
  combineReducers({
    [barKey]: barReducer,
  })
)

const barSliceSelector = (state: RootState): BarState => state.async1[barKey]

export { barActions, barSliceSelector }
