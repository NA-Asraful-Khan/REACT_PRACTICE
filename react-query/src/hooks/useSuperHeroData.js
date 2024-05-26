
import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHero = (heroID) => {
    return axios.get(`http://localhost:4000/superheroes/${heroID}`)
}

export const useSuperHeroData = (onError, onSuccess, heroID) => {
    return useQuery(['SuperHero', heroID],
        () => fetchSuperHero(heroID),
        {
            refetchOnWindowFocus: true,
            refetchInterval: 15000,
            refetchIntervalInBackground: true,
            onError,
            onSuccess
        }

    )

}