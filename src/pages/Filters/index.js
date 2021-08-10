import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx } from 'emotion'
import useForm from '../../hooks/useForm'
import Stack from '../../components/Stack'
import Fieldset from '../../components/Form/Fieldset'
import Select from '../../components/Form/Select'
import Radio from '../../components/Form/Radio'

// option 컴포넌트 밖 상수로 빼기
const options = [
  ['', '없음'],
  ['partial', '미리보기 가능'],
  ['full', '전체 공개'],
  ['ebooks', '전체 eBooks'],
  ['free-ebooks', '무료 eBooks'],
  ['paid-ebooks', '유료 eBooks']
]

function Filters() {
  const history = useHistory()
  const { state, handleChange, handleSubmit } = useForm()
  const handleCancel = () => {
    history.goBack() // 이전페이지인 result+검색어 쿼리스트링 으로 이동
  } // 취소 버튼에 연결된 페이지 이동은 이런식으로 만드는구나...

  return (
    <form onSubmit={handleSubmit}>
      <Stack gaps={[0, 20, 20, 40]}>
        <Fieldset legend="필터링">
          <Select
            id="filter"
            value={state.filter}
            onChange={handleChange}
            options={options}
          />
          {/* 이런게 토스 진유림님 영상에 나온 적절한 추상화인가? option 부분은 Select 컴포넌트에 들어가도 될것 같다. 
          배열만 props로 넘겨주는 식으로.. */}
        </Fieldset>

        <Fieldset legend="도서 종류">
          <Stack gaps={[0, 20, 20]} direction="horizontal">
            <Radio
              id="printTypeAll"
              name="printType"
              value="all"
              checked={state.printType === 'all'}
              // checked 이렇게 관리할 수 있구나...!
              onChange={handleChange}
              label="전체"
            />
            <Radio
              id="printTypeBooks"
              name="printType"
              value="books"
              checked={state.printType === 'books'}
              onChange={handleChange}
              label="일반도서"
            />
            <Radio
              id="printTypeMagazines"
              name="printType"
              value="magazines"
              checked={state.printType === 'magazines'}
              onChange={handleChange}
              label="잡지"
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="정렬 순서">
          <Stack gaps={[0, 20, 20]} direction="horizontal">
            <Radio
              id="orderByRelevance"
              name="orderBy"
              value="relevance"
              checked={state.orderBy === 'relevance'}
              onChange={handleChange}
              label="관련성"
            />
            <Radio
              id="orderByNewest"
              name="orderBy"
              value="newest"
              checked={state.orderBy === 'newest'}
              onChange={handleChange}
              label="최신순"
            />
          </Stack>
        </Fieldset>

        <Stack gaps={[0, 10]} direction="horizontal">
          <button
            type="button"
            className={cx([styles.button, styles.cancel])}
            onClick={handleCancel}
          >
            취소
          </button>
          <button type="submit" className={cx([styles.button, styles.submit])}>
            확인
          </button>
        </Stack>
      </Stack>
    </form>
  )
}

const styles = {
  button: 'w-20 font-bold py-2 px-4 rounded-full',
  cancel:
    'border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700',
  submit: 'bg-blue-500 hover:bg-blue-700 text-white'
}

export default Filters
