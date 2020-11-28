import { createSelector } from '@reduxjs/toolkit'
import { fooSliceSelector } from './foo.slice'

// eslint-disable-next-line import/prefer-default-export
export const fooDataSelector = createSelector(fooSliceSelector, (fooSlice) => fooSlice?.data)
