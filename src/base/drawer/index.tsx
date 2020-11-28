/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import { css } from '@emotion/react'
import { singletonHook } from 'react-singleton-hook'

const commonStyles = css`
  height: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
  background: white;
  border-radius: 0.5rem;
  margin-inline-end: 1rem;
`

const styles = {
  primary: css`
    ${commonStyles}
    width: 500px;
    z-index: 1200;
  `,
  secondary: css`
    ${commonStyles}
    width: 300px;
    z-index: 1199;
  `,
  backdrop: css`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    filter: blur(8px);
  `,
  drawerWrapper: css`
    display: grid;
    grid-template-columns: 1fr auto auto 0;
    margin-block: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  `,
}

const useDrawerImpl = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showSecondaryDrawer, setShowSecondaryDrawer] = useState(false)
  const [primaryContent, setPrimary] = useState<any>(null)
  const [secondaryContent, setSecondary] = useState<any>(null)

  const openPrimary: any = useCallback(() => {
    setShowDrawer(true)
  }, [setShowDrawer])

  const openSecondary: any = useCallback(() => {
    setShowSecondaryDrawer(true)
  }, [setShowSecondaryDrawer])

  const closePrimary: any = useCallback(() => {
    setShowDrawer(false)
  }, [setShowDrawer])

  const closeSecondary: any = useCallback(() => {
    setShowSecondaryDrawer(false)
  }, [setShowSecondaryDrawer])

  const setPrimaryContent = useCallback(
    (drawerContent) => {
      closePrimary()
      setTimeout(() => {
        setPrimary(drawerContent)
      }, 175)
    },
    [setPrimary, closePrimary]
  )

  const setSecondaryContent = useCallback(
    (drawerContent) => {
      closeSecondary()
      setTimeout(() => {
        setSecondary(drawerContent)
      }, 175)
    },
    [setSecondary, closeSecondary]
  )

  const drawer = useMemo(
    () => (
      <Fade in={showDrawer || showSecondaryDrawer} mountOnEnter unmountOnExit>
        <div>
          <Paper
            css={styles.backdrop}
            onClick={() => {
              if (showSecondaryDrawer) {
                closeSecondary()
              } else if (showDrawer) {
                closePrimary()
              }
            }}
          />
          <div css={styles.drawerWrapper}>
            <div />
            <Fade
              in={showSecondaryDrawer}
              timeout={{
                exit: 100,
                enter: 250,
              }}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <Slide direction="left" in={showSecondaryDrawer}>
                  <Paper elevation={4} css={styles.secondary}>
                    {secondaryContent}
                  </Paper>
                </Slide>
              </div>
            </Fade>
            <Slide direction="left" in={showDrawer} mountOnEnter unmountOnExit>
              <Paper elevation={4} css={styles.primary}>
                {primaryContent}
              </Paper>
            </Slide>
            <div />
          </div>
        </div>
      </Fade>
    ),
    [
      closePrimary,
      closeSecondary,
      primaryContent,
      secondaryContent,
      showDrawer,
      showSecondaryDrawer,
    ]
  )

  useEffect(() => {
    if (primaryContent) {
      openPrimary()
    }
  }, [primaryContent, openPrimary])

  useEffect(() => {
    if (secondaryContent) {
      openSecondary()
    }
  }, [secondaryContent, openSecondary])

  return {
    primaryContent,
    openPrimary,
    secondaryContent,
    openSecondary,
    closePrimary,
    closeSecondary,
    setPrimaryContent,
    setSecondaryContent,
    drawer,
  }
}

const useDrawer = singletonHook(
  {
    primaryContent: null,
    secondaryContent: null,
    openPrimary: () => {},
    openSecondary: () => {},
    closePrimary: () => {},
    closeSecondary: () => {},
    setPrimaryContent: () => {},
    setSecondaryContent: () => {},
    drawer: <div />,
  },
  useDrawerImpl
)

export default useDrawer
