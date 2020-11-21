import { call, put, takeEvery } from 'redux-saga/effects'
import { sagaMiddleware } from 'app/store'
import { PayloadAction } from '@reduxjs/toolkit'

// saga worker fn
function* fetchUser(action: PayloadAction<{ id: string }>) {
  const { barActions } = yield import('./bar.slice')
  const { routingActions } = yield import('base/components/routing/routing.slice')
  const { getUser } = yield import('./bar.repository')
  try {
    const response = yield call(getUser, action.payload.id)
    yield put(barActions.getUserSuccess(response))
    // Routing from saga.
    yield put(routingActions.replace('/bar?a=3&b=4#saga'))
  } catch (e) {
    yield put(barActions.getUserError(e))
  }
}

// saga watcher fn
function* barSaga(): any {
  const { barActions } = yield import('./bar.slice')
  yield takeEvery(barActions.getUser, fetchUser)
}

sagaMiddleware.run(barSaga)
