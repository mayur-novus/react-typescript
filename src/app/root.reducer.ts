import { combineReducers, ReducersMapObject } from 'redux'
import { loadingKey, loadingReducer } from 'base/components/loading/loading.slice'
import { routingKey, routingReducer } from 'base/components/routing/routing.slice'

export default function createReducer(asyncReducers?: ReducersMapObject) {
  return combineReducers({
    [loadingKey]: loadingReducer,
    [routingKey]: routingReducer,
    ...asyncReducers,
  })
}
