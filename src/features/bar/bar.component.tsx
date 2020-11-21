import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { barDataSelector } from './bar.selectors'

const Bar = () => {
  const dispatch = useDispatch()
  const data = useSelector(barDataSelector)

  const onGetUserData = async () => {
    const [{ barActions }] = await Promise.all([import('./bar.slice'), import('./bar.sagas')])
    dispatch(barActions.getUser('novus-logics'))
  }

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  }

  return <button onClick={onGetUserData}>Get novus-logics</button>
}

export default Bar
