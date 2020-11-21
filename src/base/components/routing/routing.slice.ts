import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Location } from 'history'

interface RoutingState {
  pathname?: string
  search?: string
  hash?: string
  state?: string
  key?: string
}

const routingState: RoutingState = {}

const routingSlice = createSlice({
  name: 'routing',
  initialState: routingState,
  reducers: {
    push: (state, action: PayloadAction<string>) => {},
    replace: (state, action: PayloadAction<string>) => {},
    goBack: (state) => {},
    set: (state: Draft<RoutingState>, action: PayloadAction<Location<any>>) => {
      state.pathname = action.payload.pathname
      state.search = action.payload.search
      state.hash = action.payload.hash
      state.state = action.payload.state
      state.key = action.payload.key
    },
  },
})

export const { name: routingKey, reducer: routingReducer, actions: routingActions } = routingSlice
