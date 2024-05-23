import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHeros=()=>{
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const {isLoading,data,isError,error,refetch}= useQuery(
    'super-heros',
    fetchSuperHeros,
    {
      // staleTime:30000,
      // cacheTime:5000,
      // refetchOnMount:true,
      refetchOnWindowFocus:'always',
      refetchInterval: 15000,
      refetchIntervalInBackground:true,
      // enabled:false
    }
  )

  if(isLoading){
    return <h2>Loading ....</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>RQ Super Heros Page</h2>
      {/* <button onClick={refetch}>Fetch Heros</button> */}
      {data?.data.map((hero)=>{
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}
