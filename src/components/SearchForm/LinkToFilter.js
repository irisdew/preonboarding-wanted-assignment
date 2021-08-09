import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import IconFilter from './IconFilter'

function LinkToFilter() {
  const location = useLocation()

  // location.search 는 /result와 똑같은 검색어가 포함된 쿼리스트링
  // orderBy=relevance&printType=all&q=검색어

  return (
    <Link
      to={{
        pathname: '/filters',
        search: location.search
      }}
      className={styles.wrapper}
    >
      <IconFilter />
    </Link>
  )
}

const styles = {
  wrapper: 'text-blue-500 hover:text-blue-700'
}

export default LinkToFilter
