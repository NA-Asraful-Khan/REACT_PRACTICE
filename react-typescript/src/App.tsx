
import './App.css'
import { Greet } from './componants/Greet'
import { PersonList } from './componants/PersonList'
import { PersonName } from './componants/PersonName'

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
    </>
  )
}

export default App
