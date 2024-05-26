import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeros = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}

const RQParallel = () => {

    const { data: superHeros } = useQuery('superheros', fetchSuperHeros)
    const { data: friends } = useQuery('friends', fetchFriends)

    return (
        <>
            <h2>Parallel Quiries</h2>
            <h3>Super Hero List</h3>
            {
                superHeros?.data.map(superhero => {
                    return <h4 key={superhero.id}>{superhero.name}</h4>
                })
            }
            <h3>Friends List</h3>

            {
                friends?.data.map(friend => {
                    return <h4 key={friend.id}>{friend.name}</h4>
                })
            }

        </>
    )
}

export default RQParallel