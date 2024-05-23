import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import Navbar from './components/Navbar/Navbar'
import {QueryClientProvider,QueryClient} from 'react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <>
  <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
