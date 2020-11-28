import { useCallback, useEffect, useMemo, useState } from 'react'
import { createNextState } from '@reduxjs/toolkit'
import { singletonHook } from 'react-singleton-hook'
import useDrawer from './index'

const useDrawerManagerImpl = () => {
  const { setSecondaryContent, setPrimaryContent: setPrimary, primaryContent } = useDrawer()
  const [stack, updateStack] = useState<any>([])

  const secondaryContent = useMemo(() => (stack.length > 0 ? stack[stack.length - 1] : null), [
    stack,
  ])

  useEffect(() => {
    setSecondaryContent(secondaryContent)
  }, [secondaryContent, setSecondaryContent])

  const push = useCallback(
    (_data: any, type: 'primary' | 'secondary' = 'secondary') => {
      if (type === 'primary') {
        setPrimary(_data)
      } else {
        updateStack(
          createNextState(stack, (draftState: any) => {
            draftState.push(_data)
          })
        )
      }
    },
    [stack, setPrimary]
  )

  const pop = useCallback(
    (type: 'primary' | 'secondary' = 'secondary') => {
      if (type === 'primary') {
        setPrimary(null)
      } else {
        updateStack(
          createNextState(stack, (draftState: any) => {
            draftState.pop()
          })
        )
      }
    },
    [stack, setPrimary]
  )

  return {
    isSecondaryVisible: !!secondaryContent,
    isPrimaryVisible: !!primaryContent,
    setPrimary,
    push,
    pop,
  }
}

const useDrawerManager = singletonHook(
  {
    isSecondaryVisible: false,
    isPrimaryVisible: false,
    setPrimary: () => {},
    push: () => {},
    pop: () => {},
  },
  useDrawerManagerImpl
)

export default useDrawerManager
