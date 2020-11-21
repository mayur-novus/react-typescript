import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import loadable from '@loadable/component'
import Loading from 'base/components/loading/loading.component'
import { useRouting } from 'base/components/routing/routing.hook'

const Foo = loadable(() => import('features/foo/foo.component'), Loading)
const Bar = loadable(() => import('features/bar/bar.component'), Loading)

export default function App() {
  const { push } = useRouting()

  return (
    <>
      <ul>
        <li onClick={() => push('/')}>
          <span>Home</span>
        </li>
        <li>
          <Link to="/foo?1#a">Foo</Link>
        </li>
        <li onClick={() => push('/bar?2#b')}>
          <span>Bar</span>
        </li>
      </ul>
      <Switch>
        <Route exact={true} path="/foo">
          <Foo />
        </Route>
        <Route exact={true} path="/bar">
          <Bar />
        </Route>
      </Switch>
    </>
  )
}
