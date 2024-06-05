
import { useState } from 'react'
import './App.css'
import { Button } from './componants/Button'
import { Container } from './componants/Container'
import { Greet } from './componants/Greet'
import { Heading } from './componants/Heading'
import { Input } from './componants/Input'
import { Oscar } from './componants/Oscar'
import { PersonList } from './componants/PersonList'
import { PersonName } from './componants/PersonName'
import { Status } from './componants/Status'
import { LoggedIn } from './componants/state/LoggedIn'
import { Counter } from './componants/state/Counter'
import { ThemeContextProvider } from './componants/context/ThemeContext'
import { Box } from './componants/context/Box'
import { UserContextProvider } from './componants/context/UserContext'
import { User } from './componants/context/User'
import { MutableRef } from './componants/refs/MutableRef'
import { ClassCounter } from './componants/class/ClassCounter'
import { Private } from './componants/auth/Private'
import { Profile } from './componants/auth/Profile'
import { List } from './componants/generics/List'
import { RandomNumber } from './componants/restriction/RandomNumber'
import { Toast } from './componants/templateLiterals/Toast'

function App() {
  const [firstTen, setFirstTen] = useState(false)
  const [secondTen, setSecondTen] = useState(true)
  const [thirdTen, setThirdTen] = useState(true)
  const heroDetails =[
    {
      id: 1,
      first: 'Bruce',
      last: 'Wayne'
    },
    {
      id: 2,
      first: 'Clark',
      last: 'Kent'
    },
    {
      id: 3,
      first: 'Princess',
      last: 'Diana'
    }
  ]

  const personName = {
    first: "Bruce",
    last: "Wayne"
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
      <button onClick={() => setFirstTen(!firstTen)}>{!firstTen ? "Show Top 1-11 Componants" : "Hide Top 1-11 Componants"}</button>
      <button onClick={() => setSecondTen(!secondTen)}>{!secondTen ? "Show Top 12-21 Componants" : "Hide Top 12-21 Componants"}</button>
      <button onClick={() => setThirdTen(!thirdTen)}>{!thirdTen ? "Show Top 20-Rest Componants" : "Hide Top 20-Rest Componants"}</button>
      <br />
      {
        firstTen &&
        <>
          <LoggedIn></LoggedIn>
          <Container styles={{ border: '1px solid black', padding: '5px' }} />
          <Input value='qwerrwq' handleChange={(e) => {
            console.log(e)
          }} />
          <Button handleClick={(e, id) => {
            console.log("Clicked", e, id)
          }} />
          <Greet name={'Shikhor'} messageCount={10} isLoggedIn={true} />
          <PersonName name={personName} />
          <PersonList names={nameList} />
          <Status status={'loading'} />
          <Heading>Heading Text</Heading>
          <Oscar>
            <Heading>Oscar Goes to Leonardo D Caprio</Heading>
          </Oscar>
        </>
      }
      {
        secondTen &&
        <>
          <Counter />
          <ThemeContextProvider>
            <Box />
          </ThemeContextProvider>
          <UserContextProvider>
            <User />
          </UserContextProvider>

          <MutableRef />
          <ClassCounter message='The Count Value Is' />
          <Private isLoggedIn={true} component={Profile} />
          

          <List
            items={heroDetails}
            onClick={item => console.log(item)}
          />

          <RandomNumber value={10} isPositive/>

        </>
      }

      {
        thirdTen && 
        <>
        <Toast position={'center-bottom'}/>
        </>
      }
    </>
  )
}

export default App
