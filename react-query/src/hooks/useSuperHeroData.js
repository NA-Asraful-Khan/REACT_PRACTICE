
import axios from "axios"
import { useQuery, useQueryClient } from "react-query"


const fetchSuperHero = ({queryKey}) => {
    const heroID = queryKey[1]
    return axios.get(`http://localhost:4000/superheroes/${heroID}`)
}

export const useSuperHeroData = (onError, onSuccess, heroID) => {
    const queryClient = useQueryClient()
    return useQuery(['Super-Hero', heroID],fetchSuperHero,
        {
            initialData:()=>{
                const hero = queryClient.getQueryData('super-heros')?.data?.find(hero => parseInt(hero.id) === parseInt(heroID))

                if(hero){
                    return{data:hero} 
                }else {
                    return undefined
                }
            }, //Data Query From Cache
            refetchOnWindowFocus: true,
            refetchInterval: 15000,
            refetchIntervalInBackground: true,
            onError,
            onSuccess
        }

    )

}