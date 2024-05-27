import { Fragment } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import axios from 'axios'

const fetchUserWithQueries = ({ pageParam = 1 }) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/?_limit=2&_page=${pageParam}`)
}

const fetchuser = () => {
  return axios.get(`https://jsonplaceholder.typicode.com/users`)
}



export const InfiniteQueriesPage = () => {

  const {data:allUser}=useQuery('user', fetchuser)
  
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['queryUser'], fetchUserWithQueries, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < (allUser?.data.length -1)/2) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  console.log(allUser?.data.length)

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map(user => (
                <h2 key={user.id}>
                  {user.id} {user.name}
                </h2>
              ))}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}