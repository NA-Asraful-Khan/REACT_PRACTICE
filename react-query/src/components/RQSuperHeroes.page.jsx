
import { Link } from "react-router-dom"
import { useCreateSuperHeroByMutation, useSuperHerosData } from "../hooks/useSuperHerosData"
import { useState } from "react"



export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = ()=>{
    console.log('Perform side effect after data fetching')
  }

  const onError = (e)=>{
    console.log('Perform side effect after an error',e)
  }
  const {isLoading,data,isError,error,refetch}= useSuperHerosData(onError,onSuccess)

  const {mutate:addHero, isLoading:loadingWhilePosting}= useCreateSuperHeroByMutation()

  const handleAddHeroClick = (e) => {
    e.preventDefault()

    const hero ={ name, alterEgo }
    addHero(hero)
    setName('')
    setAlterEgo('')
  }

  if(isLoading){
    return <h2>Loading ....</h2>
  }



  if(isError){
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>RQ Super Heros Page</h2>

      <div>
        <input
          type='text'
          value={name}
          placeholder="Hero Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          placeholder="Actor Name"
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick} disabled={!name || !alterEgo}>Add Hero</button>
      </div>
      {/* <button onClick={refetch}>Fetch Heros</button> */}
      {
        data?.data.map((hero)=>{
          return <>
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            
          </div>
          {/* {loadingWhilePosting && <p>Loading ...!</p>} */}
          </>
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
