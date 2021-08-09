import { createSlice } from '@reduxjs/toolkit'
import { parse } from 'query-string'

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch(_state, action) {
      return action.payload
    }
  }
})

export const { setSearch } = searchSlice.actions

export const selectSearch = (state) => parse(state.search)

export default searchSlice.reducer

// 이것도 안쓰이네!
// useForm의 useReducer부분을 이걸로 대체할려고 만들었다가 안한건가?

// createSlice

// redux 에서 모듈을 관리하기 위한 패턴중 ducks-pattern 을 공식적으로 지원
// action type을 만들고, action creator를 만들고, reducer를 만드는 모든 일이 createSlice 한방에 가능

// name : 해당 모듈의 이름을 작성합니다.
// initialState : 해당 모듈의 초기값을 세팅합니다.
// reducers : 리듀서를 작성합니다. 이때 해당 리듀서의 키값으로 액션함수가 자동으로 생성됩니다.

// https://velog.io/@goonerholic/Redux-Toolkit-createSlice-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
// https://blog.woolta.com/categories/1/posts/204
