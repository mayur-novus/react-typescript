/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { ReactElement, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import Loading from 'base/components/loading/loading.component'
import { useRouting } from 'base/components/routing/routing.hook'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import AirplayIcon from '@material-ui/icons/Airplay'
import SettingsIcon from '@material-ui/icons/Settings'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Foo = loadable(() => import('features/foo/foo.component'), Loading)
const Bar = loadable(() => import('features/bar/bar.component'), Loading)

export default function App(): ReactElement {
  const { push, replace } = useRouting()
  const [showDrawer, setShowDrawer] = useState(false)

  const navigateTo = (path: string, type: 'push' | 'replace' = 'push') => {
    setShowDrawer(false)
    if (type === 'push') {
      push(path)
    } else if (type === 'replace') {
      replace(path)
    }
  }

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onOpen={() => setShowDrawer(true)}
      >
        <List>
          <ListItem button key="Home" onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button key="Foo" onClick={() => navigateTo('/foo?a=1&b=2#abcd', 'replace')}>
            <ListItemIcon>
              <AirplayIcon />
            </ListItemIcon>
            <ListItemText primary="Foo" />
          </ListItem>

          <ListItem button key="Bar" onClick={() => navigateTo('/bar?c=3&d=4#dcba')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Bar" />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        css={css`
          padding: 0.5rem;
        `}
      >
        <Switch>
          <Route exact path="/foo">
            <Foo />
          </Route>
          <Route exact path="/bar">
            <Bar />
          </Route>
        </Switch>
      </div>
    </>
  )
}
