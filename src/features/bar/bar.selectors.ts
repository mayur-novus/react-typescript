import { createSelector } from '@reduxjs/toolkit'
import { barSliceSelector } from './bar.slice'

export const barDataSelector = createSelector(barSliceSelector, (barSlice) => barSlice?.data)
