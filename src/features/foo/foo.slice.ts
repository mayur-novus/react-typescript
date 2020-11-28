import { createSlice } from '@reduxjs/toolkit'
import { injectAsyncReducer, RootState } from 'app/store'
import { FooState } from './foo.interfaces'
import { getUser, getUserSuccess, getUserError } from './fooslice-user-workflow'

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
    getUser,
    getUserSuccess,
    getUserError,
  },
})

// Actions, reducer and name
const { actions: fooActions, name: fooKey, reducer: fooReducer } = fooSlice

const fooSliceSelector = (state: RootState): FooState => state[fooKey]

injectAsyncReducer(fooKey, fooReducer)

// Export only what is required
export { fooActions, fooSliceSelector }
