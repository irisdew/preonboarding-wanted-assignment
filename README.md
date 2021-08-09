# 책책책 책을 찾읍시다!

### Query string

사용자가 입력 데이터를 전달하는 방법중에 하나로, url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다

- 정해진 엔드포인트 주소 이후에 ?를 쓰는것으로 쿼리스트링이 시작함을 알린다
- parameter=value로 필요한 파라미터의 값을 적는다
- 파라미터가 여러개일 경우 &를 붙여 여러개의 파라미터를 넘길 수 있다.
- 엔드포인트주소/엔드포인트주소?파라미터=값&파라미터=값
- = 로 key 와 value 가 구분된다.

### useLocation

- pathname
- search
  - pathname이 출력했던 부분을 제외한 쿼리스트링이 출력됨
  - 출력된 값은 query-string이라는 쿼리스트링 파싱 라이브러리를 이용하여 값을 얻어낼 수 있음

### useReducer

useState보다 복잡한 상태관리가 필요핼 때 useReducer 사용

```jsx
const [<상태 객체>, <dispatch 함수>] = useReducer(<reducer 함수>, <초기 상태>, <초기 함수>)
```

- reducer 함수
  : 현재 상태(state) 객체와 행동(action) 객체를 인자로 받아서
  새로운 상태(state) 객체를 반환하는 함수
- dispatch 함수
  : 컴포넌트 내에서 상태 변경을 일으키기 위해서 사용
  인자로 reducer 함수에 넘길 행동(action) 객체를 받습니다
- 초기 함수

```jsx
const [state, dispatch] = useReducer(reducer, {
  ...initialState,
  ...parse(location.search)
})
```

### createSlice

redux-toolkit

<hr />

### Reference

https://velog.io/@pear/Query-String-%EC%BF%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A7%81%EC%9D%B4%EB%9E%80
https://www.daleseo.com/react-hooks-use-reducer/
