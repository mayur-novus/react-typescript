import { createSelector } from '@reduxjs/toolkit'
import { fooSliceSelector } from './foo.slice'

export const fooDataSelector = createSelector(fooSliceSelector, (fooSlice) => fooSlice?.data)
