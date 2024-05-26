
import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHeros=()=>{
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHerosData=(onError,onSuccess)=>{
    return useQuery(
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
          // select:(data)=>{
          //   const superHeroNames = data.data.map((hero)=> hero.name)
          //   return superHeroNames
          // }
        }
      )
    
}