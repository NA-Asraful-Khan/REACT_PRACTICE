import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchUserByEmail = email => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = channelId => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))

    const channelId = user?.data?.channelId

    const { data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId),
        {
            enabled: !!channelId
        })

    console.log(courses?.data?.courses)
    return (
        <>
            <h2>ORG name : {courses?.data?.id}</h2>
            <h3>Courses Name: </h3>
            <ol>
                {
                    courses?.data?.courses.map(course=>{
                        
                        return <li>{course}</li>
                    })
                }
            </ol>
        </>
    )
}
