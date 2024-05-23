import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHeros=()=>{
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const onSuccess = ()=>{
    console.log('Perform side effect after data fetching')
  }

  const onError = (e)=>{
    console.log('Perform side effect after an error',e)
  }
  const {isLoading,data,isError,error,refetch}= useQuery(
    'super-heros',
    fetchSuperHeros,
    {
      // staleTime:30000,
      // cacheTime:5000,
      // refetchOnMount:true,
      refetchOnWindowFocus:true,
      refetchInterval: 15000,
      refetchIntervalInBackground:true,
      // enabled:false

      onError,
      onSuccess,
      select:(data)=>{
        const superHeroNames = data.data.map((hero)=> hero.name)
        return superHeroNames
      }
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
      {
        data.map((heroName,index)=>{
          return <div key={index}>{heroName}</div>
        })
      }
    </>
  )
}
