import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BasicTable } from './componants/BasicTable'
import { SortingTable } from './componants/SortingTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SortingTable></SortingTable>
    </>
  )
}

export default App
