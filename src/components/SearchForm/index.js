import React from 'react'
import { useLocation } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import LinkToFilter from './LinkToFilter'

function SearchForm() {
  const location = useLocation()
  const { state, handleChange, handleSubmit } = useForm()
  // 바로 useSelector로 해서 redux에 검색어 state 넣어놓고 가져와서 쓰면 되지 않을까?

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <fieldset>
        <label htmlFor="q" className={styles.label}>
          <span hidden>검색어</span>
          <input
            type="search"
            id="q"
            name="q"
            defaultValue={state.q}
            placeholder="제목, 저자, 출판사를 검색해 보세요"
            required
            onChange={handleChange} // 어차피 q(검색어)만 바꿔줌
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.submit}>
          검색
        </button>
      </fieldset>

      {location.pathname === '/result' && <LinkToFilter />}
    </form>
  )
}
// <LinkTofilter/> 필터 아이콘
// 왜 location.pathname === '/result'로 조건부렌더링이 걸려있지?
// 검색창 다른 곳에서도 쓰나?

const styles = {
  wrapper: 'flex items-center justify-between sticky',
  label: 'mb-1 text-gray-700',
  input: 'w-64 h-8 px-2 border border-r-0 rounded-l focus:outline-none text-sm',
  submit:
    'h-8 px-4 rounded-r bg-blue-500 hover:bg-blue-700 text-white align-top'
}

export default SearchForm
