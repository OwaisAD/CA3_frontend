import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search'
import Error from './components/Error'
import Profile from './components/Profile'
import Login from './components/Login'
import ProtectedRoutes from './ProtectedRoutes'
import Register from './components/Registration'

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [createAccountClicked, setCreateAccountClicked] = useState(false)
    const [addedMovieToWatchlist, setAddedMovieToWatchlist] = useState(false)
    const [dataFromServer, setDataFromServer] = useState([]);

    const initialState = () => {
      window.sessionStorage.getItem("movie") 
    }
    const [movieData, setMovieData] = useState(initialState);
  
  return (
    <>
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} setErrorMsg={setErrorMsg} setCreateAccountClicked={setCreateAccountClicked}/>
      
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="search" element={<Search movieData={movieData} setMovieData={setMovieData} />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAddedMovieToWatchlist={setAddedMovieToWatchlist}/>} />
         
        </Route>
        
        <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} errorMsg={errorMsg} createAccountClicked={createAccountClicked} setCreateAccountClicked={setCreateAccountClicked}/>} />
        <Route path='/register' element={<Register setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} errorMsg={errorMsg}/>}/>

        <Route path='error' element={<Error errorMsg={errorMsg}/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default App
