import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBooks, fetchBooks, Status } from '../../store/books'
import { useLocation } from 'react-router-dom'

function Pagination() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { status, startIndex } = useSelector(selectBooks) // startIndex는 store에서 가져오기
  const isLoading = status === Status.Loading // 플래그 값 사용

  return (
    <button
      className={styles.button}
      disabled={startIndex === 0 || isLoading} // 여기서도 startIndex가 0인지 검사하네..!
      // 검색결과가 없는 경우 disabled 되어야하니까?
      onClick={() => {
        if (isLoading) {
          return
        }
        dispatch(fetchBooks(location.search, startIndex)) // 쿼리스트링을 search에 넘겨줌, startIndex도 넘겨줌
        // 쿼리스트링은 바뀌지 않음, 페이지 url이 그대로니까
        // startIndex만 바뀌는 것임..!
      }}
    >
      {isLoading ? '로딩중...' : '더보기'}
    </button>
  )
}

const styles = {
  button:
    'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
}

export default Pagination

// 검색 결과가 없는 경우에도 "로딩중..."(disabled된 버튼)이 뜨는데 없는 경우는 "검색결과가 없습니다." 띄워줘야 할 것 같음
// ...로딩중 만 나오면 계속 기다릴 것 같음
