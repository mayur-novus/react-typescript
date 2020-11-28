import { Action, CombinedState, combineReducers, Reducer, ReducersMapObject } from 'redux'
import { loadingKey, loadingReducer } from 'base/components/loading/loading.slice'
import { routingKey, routingReducer } from 'base/components/routing/routing.slice'

export default function createReducer(
  asyncReducers?: ReducersMapObject
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Reducer<CombinedState<any>, Action<unknown>> {
  return combineReducers({
    [loadingKey]: loadingReducer,
    [routingKey]: routingReducer,
    ...asyncReducers,
  })
}
