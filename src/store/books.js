import { createSlice } from '@reduxjs/toolkit'
import { getBooks } from '../api'

export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure'
}

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    totalItems: 0, // ??? 뭔지 모르겠음
    startIndex: 0, // 다음에 가져올 index 시작 번호 // 10개씩 가져오기 떄문에 "더보기" 누를 경우 0->10->20.. 이런식으로 변화함
    // items.length와 항상 동일함. 불필요한 값....?!
    // 초기에 0으로 만들어줘야함
    status: Status.Idle,
    error: null
  },
  reducers: {
    // 가져오기 시작
    getItemsStart(state, action) {
      if (action.payload === 0) {
        state.items = [] // startIndex가 0이라면 items 초기화
      }

      state.error = null // 이전 에러 삭제
      state.status = Status.Loading // 상태 로딩중으로 변경
    },

    // 가져오기 성공
    getItemsSuccess(state, action) {
      const { items, totalItems, startIndex } = action.payload
      const nextItems = startIndex ? state.items.concat(items) : items // startIndex가 0이 아니면 기존에 있던 items와 합쳐줌, 0이면 기존 items
      // 이 코드에서 startIndex 검사할 필요 없지 않나?
      // 어차피 getITemsStart로 초기화 되니까 뭔가 중복 검사인 것 같음

      state.items = nextItems
      state.startIndex = nextItems.length // 가져오기 성공하면 startIndex 바꿔줌
      state.totalItems = totalItems
      state.status = Status.Success // 상태 성공으로 변경
    },

    // 가져오기 실패
    getItemsFailure(state, action) {
      state.error = action.payload
    }
  }
})

export const { getItemsStart, getItemsSuccess, getItemsFailure } =
  booksSlice.actions

export default booksSlice.reducer

export const selectBooks = (state) => state.books

export const fetchBooks =
  (search, startIndex = 0) =>
  async (dispatch) => {
    try {
      dispatch(getItemsStart(startIndex)) // 가져오기 시작

      const response = await getBooks(search, startIndex) // api 호출
      const data = await response.json()

      dispatch(getItemsSuccess({ ...data, startIndex })) // 가져오기 성공
    } catch (error) {
      dispatch(getItemsFailure(error)) // 가져오기 실패
    }
  }
