import React from 'react'
import { css } from 'emotion'

function Stack({ children, gaps, direction = 'vertical' }) {
  const dir = direction === 'vertical' ? 'top' : 'left'
  const style = css`
    ${gaps.map(
      (gap, index) => `& > *:nth-child(${index + 1}) { 
        margin-${dir}: ${gap}px 
      }`
    )}
  `

  return <div className={style}>{children}</div>
}

export default Stack
// css margin을 이렇게 컴포넌트로 관리하다니! 신기함.
// 이렇게 하는게 좋은건지는 모르겠음
