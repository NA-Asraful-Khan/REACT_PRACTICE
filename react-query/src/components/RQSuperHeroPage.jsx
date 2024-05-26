import React from 'react'
import { useSuperHeroData } from '../hooks/useSuperHeroData'
import { useParams } from 'react-router-dom'

export const RQSuperHeroPage = () => {

    const {heroID} = useParams()

    const onSuccess = ()=>{
        console.log('Perform side effect after data fetching')
      }
    
      const onError = (e)=>{
        console.log('Perform side effect after an error',e)
      }
      const {isLoading,data,isError,error,refetch}= useSuperHeroData(onError,onSuccess,heroID)
    
      if(isLoading){
        return <h2>Loading ....</h2>
      }
    
      if(isError){
        return <h2>{error.message}</h2>
      }
  return (
    <>
        <h2>{data?.data.name} -- {data?.data.alterEgo}</h2>
    </>
  )
}
