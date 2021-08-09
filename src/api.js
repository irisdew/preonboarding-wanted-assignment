import { stringifyUrl, parse } from 'query-string'

export async function getBooks(search, startIndex) {
  const { q, ...rest } = parse(search) // 검색어, ...나머지
  const input = stringifyUrl({
    url: 'https://www.googleapis.com/books/v1/volumes',
    query: {
      q: `${q}`,
      startIndex,
      projection: 'full',
      ...rest
    }
  })

  return fetch(input)
}

// https://www.googleapis.com/books/v1/volumes?
// orderBy=relevance&
// printType=all&
// projection=full&
// q=검색어
// startIndex=0

// api 문서
// https://developers.google.com/books/docs/v1/using
