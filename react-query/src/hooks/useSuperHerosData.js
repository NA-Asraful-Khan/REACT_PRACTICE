
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"


const fetchSuperHeros=()=>{
  return axios.get('http://localhost:4000/superheroes')
}

const postSuperHero=(hero)=>{
  return axios.post('http://localhost:4000/superheroes',hero)
}

const deleteSuperHero = (heroId) => {
  return axios.delete(`http://localhost:4000/superheroes/${heroId}`)
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

export const useCreateSuperHeroByMutation =()=>{
  const queryClient = useQueryClient()
  return useMutation(postSuperHero,{
    // onSuccess:(data)=>{
    //   // queryClient.invalidateQueries('super-heros') // Additional Get Request
    //   queryClient.setQueryData('super-heros',(oldQueryData)=>{
    //     return{
    //       ...oldQueryData,
    //       data:[...oldQueryData.data,data.data]
    //     }
    //   })
    // }
    onMutate: async(newData) =>{
      await queryClient.cancelQueries('super-heros')
      const previousData = queryClient.getQueryData('super-heros')
      queryClient.setQueryData('super-heros',(oldQueryData)=>{
        return {
          ...oldQueryData,
          data:[
            ...oldQueryData.data,
            {
              id:oldQueryData?.data?.length +1,...newData
            }
          ]
        }
      })
      return {
        previousData
      }
    },
    onError:(_error,_hero,context)=>{

      queryClient.setQueryData('super-heros',context.previousData)
    },
    onSettled:()=>{
      queryClient.invalidateQueries('super-heros')
    }
  })
}


export const useDeleteSuperHeroByMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteSuperHero, {
    // Optimistic Update Start
    onMutate: async (heroId) => {
      await queryClient.cancelQueries('super-heros')
      const previousHeroData = queryClient.getQueryData('super-heros')

      queryClient.setQueryData('super-heros', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: oldQueryData.data.filter(hero => hero.id !== heroId)
        }
      })

      return { previousHeroData }
    },
    onError: (_err, _heroId, context) => {
      queryClient.setQueryData('super-heros', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heros')
    }
    // Optimistic Update End
  })
}