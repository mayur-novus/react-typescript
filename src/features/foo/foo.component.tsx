import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fooDataSelector } from './foo.selectors'

const Foo = () => {
  const dispatch = useDispatch()
  const data = useSelector(fooDataSelector)

  const onGetUserData = async () => {
    // Code splitting. downloads files when the button is clicked.
    const [{ fooActions }] = await Promise.all([import('./foo.slice'), import('./foo.sagas')])
    dispatch(fooActions.getUser('mayur-novus'))
  }

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  }

  return <button onClick={onGetUserData}>Get mayur-novus</button>
}

export default Foo
