import { createSelector } from '@reduxjs/toolkit'
import { barSliceSelector } from './bar.slice'

// eslint-disable-next-line import/prefer-default-export
export const barDataSelector = createSelector(barSliceSelector, (barSlice) => barSlice?.data)
