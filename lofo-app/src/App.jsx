import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './Components/HomePage/Hero'
import { Navbar } from './Components/HomePage/Navbar'
import { About } from './Components/HomePage/About'
import { Footer } from './Components/HomePage/Footer'
import { Login } from './Components/HomePage/Login'
import { SignUp } from './Components/HomePage/SignUp'
import { Home } from './Components/Dashboard/Home'
import { MainLost } from './Components/LostItem/MainLost'
import { MainReport } from './Components/ReportItem/MainReport'
import { MainMessage } from './Components/Messaging/MainMessage'
import { MainFound } from './Components/FoundItem/MainFound'
import { MainList } from './Components/ListedItems/MainList'
import { TotalMain } from './Components/TotalItems/TotalMain'
import { MainClaim } from './Components/Claim/MainClaim';
import { OwmerMain } from './Components/Owner/OnwerMain';


function App() {

  return (
    <div className=''>
      <Router>

        <div>
          <Routes>
            <Route path='/' element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Footer />
              </>
            } />

            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/dashboard' element={<Home />}></Route>
            <Route path='/lost' element={<MainLost />}></Route>
            <Route path='/found' element={<MainFound />}></Route>
            <Route path='/reportitems' element={<MainReport />}></Route>
            <Route path='/listed' element={< MainList />}></Route >
            <Route path='/message' element={< MainMessage />}></Route >
            <Route path='/total' element={< TotalMain />}></Route>
            <Route path='/claim/:itemId' element={<MainClaim />}></Route>
            <Route path='/owner/:itemId' element={<OwmerMain />}></Route>

          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
