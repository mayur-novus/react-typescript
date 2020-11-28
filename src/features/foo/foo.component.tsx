import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
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

  return (
    <Button variant="outlined" size="small" onClick={onGetUserData}>
      Get mayur-novus
    </Button>
  )
}

export default Foo
