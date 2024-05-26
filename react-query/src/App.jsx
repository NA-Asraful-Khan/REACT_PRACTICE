import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import Navbar from './components/Navbar/Navbar'
import {QueryClientProvider,QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { RQSuperHeroPage } from './components/RQSuperHeroPage'
import RQParallel from './components/RQParallel'
import { DynamicParallelPage } from './components/DynamicParallelPage'
import { DependentQueriesPage } from './components/DependentQueriesPage'
import { PaginatedQueriesPage } from './components/PaginatedQueriesPage'

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
          <Route path="/rq-super-heroes/:heroID" element={<RQSuperHeroPage/>} />

          <Route path="/rq-parallel" element={<RQParallel/>} />
          <Route path="/dynamic-parallel" element={<DynamicParallelPage heroIds={[1,3]}/>} />

          <Route path="/rq-dependent" element={<DependentQueriesPage email= 'shikhor@example.com'/>} />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    </>
  )
}

export default App
