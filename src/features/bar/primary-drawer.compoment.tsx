import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import ListItemText from '@material-ui/core/ListItemText'
import AirplayIcon from '@material-ui/icons/Airplay'
import SettingsIcon from '@material-ui/icons/Settings'
import React from 'react'
import useDrawerManager from 'base/drawer/drawer.manager'
import Button from '@material-ui/core/Button'

const PrimaryContent = () => {
  const { push, pop, isSecondaryVisible } = useDrawerManager()
  return (
    <div>
      <List>
        <ListItem
          button
          key="Home"
          onClick={() => {
            push('Home -- Secondary from primary')
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          key="Foo"
          onClick={() => {
            push('Foo -- Secondary from primary')
          }}
        >
          <ListItemIcon>
            <AirplayIcon />
          </ListItemIcon>
          <ListItemText primary="Foo" />
        </ListItem>

        <ListItem
          button
          key="Bar"
          onClick={() => {
            push('Bar -- Secondary from primary')
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Bar" />
        </ListItem>
      </List>

      {isSecondaryVisible && (
        <Button variant="outlined" size="small" onClick={() => pop()}>
          Pop Secondary
        </Button>
      )}

      <Button variant="outlined" size="small" onClick={() => pop('primary')}>
        Close This Drawer
      </Button>
    </div>
  )
}

export default PrimaryContent
