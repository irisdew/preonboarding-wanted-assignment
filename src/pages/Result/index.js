import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, selectBooks } from '../../store/books'
import SearchForm from '../../components/SearchForm'
import Books from '../../components/Books'
import Pagination from '../../components/Books/Pagination'
import Stack from '../../components/Stack'

// http://localhost:3000/result?orderBy=relevance&printType=all&q=검색어

function Result() {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const { items } = useSelector(selectBooks)

  // console.log(search) // orderBy=relevance&printType=all&q=검색어
  // search라는 쿼리스트링으로 정보를 전달하지 말고 검색어만 redux를 통해 전역 state로 관리하면 되지 않을까?

  useEffect(() => {
    if (!search) {
      return
    }

    dispatch(fetchBooks(search)) // 책 정보 api 호출해서 가져오기, fetchBooks(search, startIndex = 0)
  }, [dispatch, search])

  return (
    <div className={styles.wrapper}>
      <Stack gaps={[0, 10, 20, 20]}>
        <SearchForm />
        <Books items={items} />
        <Pagination />
      </Stack>
    </div>
  )
}

const styles = {
  wrapper: 'pb-4'
}

export default Result
