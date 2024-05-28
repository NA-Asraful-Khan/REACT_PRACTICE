import { Name } from "./Person.type"

type PersonList ={
    names:Name[]
}

export const PersonList = (props:PersonList) => {
  return (
    <>
        {
            props.names.map(name=>{
                return <h2 key={name.first}>{name.first} {name.last}</h2>
            })
        }
    </>
  )
}
