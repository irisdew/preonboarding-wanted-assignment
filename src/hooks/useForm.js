import { useReducer } from 'react' // redux 쓰는데 왜 useReducer도 쓰지?
import { useHistory, useLocation } from 'react-router-dom'
import { stringifyUrl, parse } from 'query-string'
import { flow, omitBy, isEmpty } from 'lodash/fp'

const initialState = {
  q: '',
  orderBy: 'relevance',
  filter: '',
  printType: 'all'
}

function reducer(state, action) {
  switch (action.type) {
    case 'change': // case 1개 밖에 없는데 굳이 reducer 쓸 필요가...? 확장성 고려?!
      return {
        ...state,
        ...action.payload // q : 검색어
      }
    default:
      return state
  }
}

function useForm() {
  const history = useHistory()
  const location = useLocation()
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...parse(location.search)
  })

  // 쿼리스트링을 포함한 url 생성 후 이동시키기
  function handleRouter(query) {
    const path = stringifyUrl({
      url: '/result',
      query
    })

    history.push(path)
  }

  // 쿼리를 넘겨줌
  function handleSubmit(e) {
    e.preventDefault()

    const query = flow(omitBy(isEmpty))(state)
    // lodash 코드.. 하나도 모르겠어.. ㅠㅠ
    // flow([funcs]) : 괄호안의 함수 연속적으로 실행, successive invocation, return value of the previous
    // omitBy() : 괄호 안의 조건에 대해 truthy인 값을 생략함
    // isEmpty : Checks if value is an empty object, collection, map, or set
    // => state에서 빈값 제거(쿼리스트링 생성하기 위해)

    handleRouter(query)
  }

  function handleChange(e) {
    const { name, value } = e.target

    dispatch({
      type: 'change',
      payload: {
        [name]: value
      }
    })
  }

  function handleSelect(e) {
    const { name, value } = e.target

    handleChange(e)
    handleRouter({
      ...parse(location.search),
      [name]: value
    })
  }

  return {
    state,
    handleChange,
    handleSelect,
    handleSubmit
  }
}

export default useForm

// 모든 폼에 사용할 수 있는 useForm 넘넘 좋은 것 같다. good
// 근데 useForm이 과연 필요한가..? 바로 redux dispatch 보내면 안되나?

// useReducer는 컴포넌트의 상태를 관리하는 방법일 뿐이며, 클래스 컴포넌트에서 사용하는 this.state, this.setState와 똑같이 동작한다.
// 여전피 props를 내려줘서 사용해야한다.
// https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/
