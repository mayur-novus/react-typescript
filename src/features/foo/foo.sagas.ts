import { call, put, takeEvery } from 'redux-saga/effects'
import { sagaMiddleware } from 'app/store'
import { fooActions } from './foo.slice'
import { getUser } from './foo.repository'

// saga worker fn
function* fetchUser(action: ReturnType<typeof fooActions.getUser>) {
  try {
    const response = yield call(getUser, action.payload.id)
    yield put(fooActions.getUserSuccess(response))
  } catch (e) {
    yield put(fooActions.getUserError(e))
  }
}

// saga watcher fn
function* fooSaga(): any {
  yield takeEvery(fooActions.getUser, fetchUser)
}

sagaMiddleware.run(fooSaga)
