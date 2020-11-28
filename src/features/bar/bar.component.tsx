import React, { ReactElement } from 'react'
import useDrawer from 'base/drawer'
import Button from '@material-ui/core/Button'
import SecondaryContent from './secondary-drawer.component'
import PrimaryContent from './primary-drawer.compoment'
import useDrawerManager from '../../base/drawer/drawer.manager'

const Bar = (): ReactElement => {
  const { drawer } = useDrawer()
  const { push } = useDrawerManager()

  const onOpenDrawer = async () => {
    push(<SecondaryContent />)

    setTimeout(() => {
      push(<PrimaryContent />, 'primary')
    }, 4000)
  }

  return (
    <>
      <Button variant="outlined" size="small" onClick={onOpenDrawer}>
        Open Drawer
      </Button>
      {drawer}
    </>
  )
}

export default Bar
