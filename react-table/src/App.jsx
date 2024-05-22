import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BasicTable } from './componants/BasicTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicTable></BasicTable>
    </>
  )
}

export default App
