import { useHistory } from 'react-router'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { routingActions } from './routing.slice'

let rHistory: any

export const RouteProvider = (props: any) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    rHistory = history

    dispatch(routingActions.set(history.location))

    history.listen((location: any) => {
      dispatch(routingActions.set(location))
    })
  }, [dispatch, history])

  return props.children
}

export const routerHistory = () => rHistory

export const useRouting = () => {
  const dispatch = useDispatch()

  const push = useCallback((url: string) => dispatch(routingActions.push(url)), [dispatch])

  const replace = useCallback((url: string) => dispatch(routingActions.replace(url)), [dispatch])

  const goBack = useCallback(() => dispatch(routingActions.goBack()), [dispatch])

  return {
    push,
    replace,
    goBack,
  }
}
