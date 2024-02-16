import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Admin from './Admin/index'
import ClassTeacher from './ClassTeacher/index'
import Student from './Student/index'
import ErrorPage from './ErrorPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={ <Login /> } />
          <Route path='/Admin' element={ <Admin /> } />
          <Route path='/ClassTeacher' element={ <ClassTeacher /> } />
          <Route path='/Student' element={ <Student /> } />
          <Route path='*' element={ <ErrorPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
