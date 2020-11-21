import React from 'react'
import { ClipLoader } from 'react-spinners'
import { css } from '@emotion/core'

const Loading = () => {
  return (
    <ClipLoader
      css={css`
        display: block;
        margin: 0 auto;
        border-color: red;
      `}
      size={35}
      color={'#123abc'}
      loading={true}
    />
  )
}

const fallback = {
  fallback: <Loading />,
}

export default fallback
