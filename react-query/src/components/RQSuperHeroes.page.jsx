
import { Link } from "react-router-dom"
import { useSuperHerosData } from "../hooks/useSuperHerosData"



export const RQSuperHeroesPage = () => {

  const onSuccess = ()=>{
    console.log('Perform side effect after data fetching')
  }

  const onError = (e)=>{
    console.log('Perform side effect after an error',e)
  }
  const {isLoading,data,isError,error,refetch}= useSuperHerosData(onError,onSuccess)

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
        data?.data.map((hero)=>{
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }


      {/* {
        data.map((heroName,index)=>{
          return <div key={index}>{heroName}</div>
        })
      } */}
    </>
  )
}
