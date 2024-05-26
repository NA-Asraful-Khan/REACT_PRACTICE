import axios from 'axios'
import React from 'react'
import { useQueries } from 'react-query'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {

    const data = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        })
    )

    console.log(data)
    return (
        <>
            {
                data.map((singleHero, index) => {
                    return (
                        <div>
                            <h4>{singleHero?.data?.data?.name} - <span>{singleHero?.data?.data?.alterEgo}</span></h4>
                            
                        </div>
                    )


                })
            }
        </>
    )
}
