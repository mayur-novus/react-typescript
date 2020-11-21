import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_SCOPE = 'default'

const initialState = {
  [DEFAULT_SCOPE]: 0,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    show: {
      reducer: (state: any, action: PayloadAction<{ scope: string }>) => {
        const { scope } = action.payload
        state[scope] = (state[scope] || 0) + 1
      },
      prepare: (scope: string = DEFAULT_SCOPE) => ({
        payload: {
          scope,
        },
      }),
    },
    hide: {
      reducer: (state: any, action: PayloadAction<{ scope: string }>) => {
        const { scope } = action.payload
        state[scope] = Math.max(0, (state[scope] || 1) - 1)
      },
      prepare: (scope: string = DEFAULT_SCOPE) => ({
        payload: {
          scope,
        },
      }),
    },
    reset: {
      reducer: (state: any, action: PayloadAction<{ scope: string }>) => {
        const { scope } = action.payload
        state[scope] = 0
      },
      prepare: (scope: string = DEFAULT_SCOPE) => ({
        payload: {
          scope,
        },
      }),
    },
  },
})

export const { name: loadingKey, reducer: loadingReducer, actions: loadingActions } = loadingSlice
