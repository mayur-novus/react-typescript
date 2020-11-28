import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import ListItemText from '@material-ui/core/ListItemText'
import AirplayIcon from '@material-ui/icons/Airplay'
import SettingsIcon from '@material-ui/icons/Settings'
import React from 'react'
import useDrawerManager from 'base/drawer/drawer.manager'

const SecondaryContent = () => {
  const { push } = useDrawerManager()
  return (
    <List>
      <ListItem
        button
        key="Home"
        onClick={() => {
          push('Home -- Secondary from secondary')
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
          push('Foo -- Secondary from secondary')
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
          push('Bar -- Secondary from secondary')
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Bar" />
      </ListItem>
    </List>
  )
}

export default SecondaryContent
