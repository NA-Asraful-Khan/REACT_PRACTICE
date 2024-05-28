
import './App.css'
import { Greet } from './componants/Greet'
import { Heading } from './componants/Heading'
import { Oscar } from './componants/Oscar'
import { PersonList } from './componants/PersonList'
import { PersonName } from './componants/PersonName'
import { Status } from './componants/Status'

function App() {

  

  const personName = {
    firstName: "Bruce",
    lastName: "Wayne"
  }

  const nameList = [
    {
      first: 'Bruce',
      last: 'Wayne'
    },
    {
      first: 'Clark',
      last: 'Kent'
    },
    {
      first: 'Princess',
      last: 'Diana'
    }
  ]

  return (
    <>
      <Greet name={'Shikhor'} messageCount={10} isLoggedIn={true} />
      <PersonName name={personName}/>
      <PersonList names={nameList}/>
      <Status status={'loading'}/>
      <Heading>Heading Text</Heading>
      <Oscar>
        <Heading>Oscar Goes to Leonardo D Caprio</Heading>
      </Oscar>
    </>
  )
}

export default App
